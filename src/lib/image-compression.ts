import imageCompression from 'browser-image-compression';

export interface CompressionOptions {
  maxWidthOrHeight?: number;
  maxSizeMB?: number;
  quality?: number;
  fileType?: 'image/jpeg' | 'image/webp' | 'image/png';
  useWebWorker?: boolean;
}

const DEFAULT_OPTIONS: CompressionOptions = {
  maxWidthOrHeight: 1920,
  maxSizeMB: 1, // 1MB,
  fileType: 'image/jpeg',
  useWebWorker: false, // Disabled to avoid CSP issues with external scripts
};

/**
 * Compress an image file using web workers
 * @param file - The file to compress
 * @param options - Compression options
 * @returns Compressed file with preserved filename and MIME type
 */
export async function compressImage(
  file: File,
  options: CompressionOptions = {}
): Promise<File> {
  const compressionOptions = { ...DEFAULT_OPTIONS, ...options };

  try {
    // Only compress if file is larger than maxSizeMB (in bytes)
    if (file.size <= compressionOptions.maxSizeMB * 1024 * 1024) {
      return file;
    }

    const compressedFile = await imageCompression(file, compressionOptions);

    // Preserve original filename and ensure correct MIME type
    const mimeType = compressionOptions.fileType || file.type;

    // Determine file extension from MIME type
    let extension = 'jpg';
    if (mimeType === 'image/jpeg' || mimeType === 'image/jpg') {
      extension = 'jpg';
    } else if (mimeType === 'image/webp') {
      extension = 'webp';
    } else if (mimeType === 'image/png') {
      extension = 'png';
    } else {
      // Fallback to original extension
      extension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    }

    // Preserve original filename but update extension if needed
    const baseName = file.name.replace(/\.[^/.]+$/, '');
    const fileName = `${baseName}.${extension}`;

    // Create a new File with the correct name and type
    return new File([compressedFile], fileName, {
      type: mimeType,
      lastModified: Date.now(),
    });
  } catch (error) {
    console.warn(`Failed to compress ${file.name}, using original:`, error);
    return file;
  }
}

/**
 * Compress multiple image files
 * @param files - Array of files to compress
 * @param options - Compression options
 * @returns Array of compressed files
 */
export async function compressImages(
  files: File[],
  options: CompressionOptions = {}
): Promise<File[]> {
  return Promise.all(files.map((file) => compressImage(file, options)));
}



