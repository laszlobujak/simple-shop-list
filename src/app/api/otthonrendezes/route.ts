import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { Resend } from 'resend';
import { env } from '@/env.mjs';
import {
  homePreparationSchema,
  homeServiceLabels,
  requesterRoleLabels,
} from '@/lib/validations/home-preparation';
import { contactInfo } from '@/data/contactInfo';

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function row(label: string, value: string) {
  return `
    <div class="field">
      <div class="label">${label}</div>
      <div class="value">${value}</div>
    </div>`;
}

// POST: quote request from the Otthonrendezés landing page
export async function POST(request: NextRequest) {
  try {
    const data = homePreparationSchema.parse(await request.json());

    const services = data.services.map((s) => homeServiceLabels[s]).join(', ');

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #f2eef2; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #555; }
            .value { margin-top: 5px; padding: 10px; background-color: #f9f9f9; border-radius: 3px; white-space: pre-wrap; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header"><h2>Új ajánlatkérés – Otthonrendezés</h2></div>
            ${row('Név:', escapeHtml(data.name))}
            ${row('Telefonszám:', escapeHtml(data.phone))}
            ${data.email ? row('E-mail:', escapeHtml(data.email)) : ''}
            ${row('Ingatlan települése:', escapeHtml(data.city))}
            ${row('Minőség:', requesterRoleLabels[data.role])}
            ${row('Kért segítség:', escapeHtml(services))}
            ${data.message ? row('Rövid leírás:', escapeHtml(data.message)) : ''}
          </div>
        </body>
      </html>
    `;

    const resend = new Resend(env.RESEND_API_KEY);
    const { data: sent, error } = await resend.emails.send({
      from: 'kapcsolat@ertekbecsleshazhoz.hu',
      to: contactInfo.email,
      subject: `Ajánlatkérés – Otthonrendezés (${data.city})`,
      html: emailHtml,
      ...(data.email ? { replyTo: data.email } : {}),
    });

    if (error) {
      console.error('Resend API error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true, messageId: sent?.id }, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: error.issues.map((issue) => ({
            field: issue.path.join('.'),
            message: issue.message,
          })),
        },
        { status: 400 }
      );
    }

    console.error('Error processing home preparation request:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
