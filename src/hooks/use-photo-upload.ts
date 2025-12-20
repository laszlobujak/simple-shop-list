import { useState, useRef } from 'react';
import { compressImages } from '@/lib/image-compression';
import { createListingSchema } from '@/lib/validations/listing';

export interface UsePhotoUploadOptions {
  maxPhotos?: number;
  onPhotosChange: (photos: string[]) => void;
  currentPhotos: string[];
}

export function usePhotoUpload({
  maxPhotos = 5,
  onPhotosChange,
  currentPhotos,
}: UsePhotoUploadOptions) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploadError('');

    const currentCount = currentPhotos.length;
    const filesToUpload = Array.from(files);

    // Check if adding these files would exceed the limit
    if (currentCount + filesToUpload.length > maxPhotos) {
      const remainingSlots = maxPhotos - currentCount;
      if (remainingSlots <= 0) {
        setUploadError(`Maximum ${maxPhotos} photos allowed. Please remove some photos first.`);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        return;
      }
      // Limit files to the remaining slots and show info message
      const originalFileCount = filesToUpload.length;
      const filesToSkip = originalFileCount - remainingSlots;
      if (filesToSkip > 0) {
        setUploadError(
          `Only ${remainingSlots} photo${remainingSlots > 1 ? 's' : ''} will be uploaded (${filesToSkip} file${filesToSkip > 1 ? 's' : ''} skipped). Maximum ${maxPhotos} photos allowed.`
        );
      }
      // Limit files to the remaining slots
      filesToUpload.splice(remainingSlots);
    }

    setUploading(true);

    try {
      // Compress images before uploading using web workers
      const compressedFiles = await compressImages(filesToUpload);

      const formData = new FormData();
      compressedFiles.forEach((file) => {
        formData.append('files', file);
      });

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to upload images');
      }

      const { urls } = await response.json();
      const newPhotos = [...currentPhotos, ...urls];

      // Validate the new photos array
      createListingSchema.shape.photos.parse(newPhotos);
      onPhotosChange(newPhotos);

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      // Clear any previous error if upload succeeded
      setUploadError('');
    } catch (error: any) {
      console.error('Upload error:', error);
      setUploadError(error.message || 'Failed to upload images');
    } finally {
      setUploading(false);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return {
    fileInputRef,
    uploading,
    uploadError,
    handleFileSelect,
    handleUploadClick,
  };
}
