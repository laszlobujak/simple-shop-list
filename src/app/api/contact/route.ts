import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { Resend } from 'resend';
import { env } from '@/env.mjs';
import {
  contactFormSchema,
  subjectLabels,
  type ContactFormInput,
} from '@/lib/validations/contact';
import { contactInfo } from '@/data/contactInfo';

const resend = new Resend(env.RESEND_API_KEY);

// POST handle contact form submission
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input with Zod
    const validatedData = contactFormSchema.parse(body) as ContactFormInput;

    // Format email content
    const subjectLabel = subjectLabels[validatedData.subject];
    const emailSubject = `Kapcsolatfelvétel: ${subjectLabel}`;

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #f4f4f4; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #555; }
            .value { margin-top: 5px; padding: 10px; background-color: #f9f9f9; border-radius: 3px; }
            .message { white-space: pre-wrap; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Új kapcsolatfelvételi üzenet</h2>
            </div>
            
            <div class="field">
              <div class="label">Név:</div>
              <div class="value">${validatedData.name}</div>
            </div>
            
            <div class="field">
              <div class="label">Email:</div>
              <div class="value">${validatedData.email}</div>
            </div>
            
            ${validatedData.phone ? `
            <div class="field">
              <div class="label">Telefonszám:</div>
              <div class="value">${validatedData.phone}</div>
            </div>
            ` : ''}
            
            <div class="field">
              <div class="label">Tárgy:</div>
              <div class="value">${subjectLabel}</div>
            </div>
            
            <div class="field">
              <div class="label">Üzenet:</div>
              <div class="value message">${validatedData.message}</div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: 'kapcsolat@ertekbecsleshazhoz.hu', // Default Resend sender - update with your verified domain
      to: contactInfo.email,
      subject: emailSubject,
      html: emailHtml,
      replyTo: validatedData.email,
    });

    if (error) {
      console.error('Resend API error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, messageId: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);

    // Handle Zod validation errors
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: error.issues.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to process contact form' },
      { status: 500 }
    );
  }
}

