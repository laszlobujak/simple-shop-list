import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, Loader2, X } from 'lucide-react';
import { usePhotoUpload } from '@/hooks/use-photo-upload';
import { isVercelBlobUrl } from '@/lib/blob-utils';

interface PhotoUploadSectionProps {
  photos: string[];
  onPhotosChange: (photos: string[]) => void;
  onPhotoRemove: (index: number) => void;
  disabled?: boolean;
  maxPhotos?: number;
}

export function PhotoUploadSection({
  photos,
  onPhotosChange,
  onPhotoRemove,
  disabled = false,
  maxPhotos = 5,
}: PhotoUploadSectionProps) {
  const {
    fileInputRef,
    uploading,
    uploadError,
    handleFileSelect,
    handleUploadClick,
  } = usePhotoUpload({
    maxPhotos,
    onPhotosChange,
    currentPhotos: photos,
  });

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="font-sans">Photos</Label>
        <span className="text-xs text-muted-foreground font-sans">
          {photos.length} / {maxPhotos}
        </span>
      </div>
      <div className="space-y-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          disabled={disabled || uploading || photos.length >= maxPhotos}
        />
        <Button
          type="button"
          variant="outline"
          onClick={handleUploadClick}
          disabled={disabled || uploading || photos.length >= maxPhotos}
          className="w-full"
        >
          {uploading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              Upload Images
            </>
          )}
        </Button>
        {uploadError && (
          <p className="text-xs text-destructive font-sans">{uploadError}</p>
        )}
        <p className="text-xs text-muted-foreground font-sans">
          Supported formats: JPEG, PNG, WebP, GIF. Images are automatically
          compressed. Maximum {maxPhotos} photos per listing.
        </p>
      </div>
      {photos.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {photos.map((photo, index) => (
            <div key={index} className="relative group w-20 h-20">
              <Image
                src={photo}
                alt={`Photo ${index + 1}`}
                fill
                className="object-cover rounded-sm"
                sizes="80px"
              />
              <button
                type="button"
                onClick={() => onPhotoRemove(index)}
                className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                disabled={disabled}
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
