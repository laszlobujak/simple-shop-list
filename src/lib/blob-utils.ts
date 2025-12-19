/**
 * Utility functions for working with Vercel Blob URLs
 */

/**
 * Check if a URL is a Vercel Blob URL
 */
export function isVercelBlobUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.includes('public.blob.vercel-storage.com');
  } catch {
    return false;
  }
}

/**
 * Extract the blob path from a Vercel Blob URL
 * Example: https://xxx.public.blob.vercel-storage.com/listings/123-abc.jpg -> listings/123-abc.jpg
 */
export function extractBlobPath(url: string): string | null {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname.includes('public.blob.vercel-storage.com')) {
      // Remove leading slash from pathname
      return urlObj.pathname.substring(1);
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Filter out Vercel Blob URLs from an array of photo URLs
 */
export function getVercelBlobUrls(photos: string[]): string[] {
  return photos.filter(isVercelBlobUrl);
}
