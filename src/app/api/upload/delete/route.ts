import { NextRequest, NextResponse } from 'next/server';
import { del } from '@vercel/blob';
import { env } from '@/env.mjs';
import { extractBlobPath, isVercelBlobUrl } from '@/lib/blob-utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { urls } = body;

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json(
        { error: 'No URLs provided' },
        { status: 400 }
      );
    }

    // Filter to only Vercel Blob URLs
    const blobUrls = urls.filter(isVercelBlobUrl);

    if (blobUrls.length === 0) {
      // No blob URLs to delete, return success
      return NextResponse.json({ success: true, deleted: 0 });
    }

    // Build options object - token is optional (auto-detected on Vercel)
    const deleteOptions: Parameters<typeof del>[1] = {};
    if (env.BLOB_READ_WRITE_TOKEN) {
      deleteOptions.token = env.BLOB_READ_WRITE_TOKEN;
    }

    // Delete all blobs
    const deletePromises = blobUrls.map(async (url) => {
      const blobPath = extractBlobPath(url);
      if (!blobPath) {
        return { url, success: false, error: 'Invalid blob URL' };
      }

      try {
        await del(blobPath, deleteOptions);
        return { url, success: true };
      } catch (error) {
        console.error(`Error deleting blob ${url}:`, error);
        return { url, success: false, error: String(error) };
      }
    });

    const results = await Promise.all(deletePromises);
    const successful = results.filter((r) => r.success).length;
    const failed = results.filter((r) => !r.success);

    if (failed.length > 0) {
      console.warn(`Failed to delete ${failed.length} blob(s):`, failed);
    }

    return NextResponse.json({
      success: true,
      deleted: successful,
      failed: failed.length,
      results,
    });
  } catch (error) {
    console.error('Error deleting blobs:', error);
    return NextResponse.json(
      { error: 'Failed to delete blobs' },
      { status: 500 }
    );
  }
}
