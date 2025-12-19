import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { env } from '@/env.mjs';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];

export async function POST(request: NextRequest) {
  try {
    // Check if token is configured
    if (!env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json(
        { error: 'Blob storage is not configured. Please set BLOB_READ_WRITE_TOKEN.' },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files provided' },
        { status: 400 }
      );
    }

    // Validate all files first
    for (const file of files) {
      if (!file || !(file instanceof File)) {
        return NextResponse.json(
          { error: 'Invalid file provided' },
          { status: 400 }
        );
      }

      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: `File ${file.name} exceeds maximum size of 10MB` },
          { status: 400 }
        );
      }

      // Check MIME type
      if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        return NextResponse.json(
          { error: `File ${file.name} has invalid type. Allowed types: JPEG, PNG, WebP, GIF` },
          { status: 400 }
        );
      }
    }

    // Upload all files to Vercel Blob
    const uploadPromises = files.map(async (file) => {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Generate a unique filename with timestamp and random string
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 15);
      const extension = file.name.split('.').pop() || 'jpg';
      const filename = `listings/${timestamp}-${randomString}.${extension}`;

      const blob = await put(filename, buffer, {
        access: 'public',
        token: env.BLOB_READ_WRITE_TOKEN,
        contentType: file.type,
      });

      return blob.url;
    });

    const urls = await Promise.all(uploadPromises);

    return NextResponse.json({ urls }, { status: 200 });
  } catch (error) {
    console.error('Error uploading files:', error);
    return NextResponse.json(
      { error: 'Failed to upload files' },
      { status: 500 }
    );
  }
}
