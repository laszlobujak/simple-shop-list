'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useForm } from '@tanstack/react-form';
import { Listing, ListingCategory, ListingStatus, CATEGORY_LABELS, STATUS_LABELS } from '@/types/listing';
import { createListingSchema, CreateListingInput } from '@/lib/validations/listing';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { X, Upload, Loader2 } from 'lucide-react';
import { isVercelBlobUrl } from '@/lib/blob-utils';

interface ListingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  listing: Listing | null;
  onSave: (listing: Listing) => void;
  isSaving?: boolean;
}

const defaultValues: CreateListingInput = {
  title: '',
  category: 'other',
  price: 0,
  description: '',
  photos: [],
  status: 'draft',
};

export function ListingDialog({ open, onOpenChange, listing, onSave, isSaving = false }: ListingDialogProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [photosToDelete, setPhotosToDelete] = useState<string[]>([]);

  const handleSave = async (value: CreateListingInput) => {
    // Delete all marked photos before saving
    if (photosToDelete.length > 0) {
      try {
        await fetch('/api/upload/delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ urls: photosToDelete }),
        });
        // Clear the deletion list after successful deletion
        setPhotosToDelete([]);
      } catch (error) {
        console.error('Error deleting blobs:', error);
        // Continue with save even if blob deletion fails
      }
    }

    const now = new Date().toISOString();
    const savedListing: Listing = listing
      ? {
          ...listing,
          ...value,
          updatedAt: now,
        }
      : {
          id: crypto.randomUUID(),
          ...value,
          createdAt: now,
          updatedAt: now,
        };
    onSave(savedListing);
  };

  const form = useForm({
    defaultValues: listing ? {
      title: listing.title,
      category: listing.category,
      price: listing.price,
      description: listing.description,
      photos: listing.photos,
      status: listing.status,
    } : defaultValues,
    validators: {
      onSubmit: createListingSchema,
    },
    onSubmit: async ({ value }) => {
      await handleSave(value);
    },
  });

  useEffect(() => {
    if (open) {
      // Reset photos to delete when dialog opens
      setPhotosToDelete([]);
      if (listing) {
        form.reset({
          title: listing.title,
          category: listing.category,
          price: listing.price,
          description: listing.description,
          photos: listing.photos,
          status: listing.status,
        });
      } else {
        form.reset(defaultValues);
      }
    } else {
      // Dialog is closing - clean up photos marked for deletion if user didn't save
      if (photosToDelete.length > 0) {
        setPhotosToDelete([]);
      }
    }
  }, [listing, open]);

  const MAX_PHOTOS = 5;

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploadError('');
    
    const currentPhotos = form.getFieldValue('photos') || [];
    const currentCount = currentPhotos.length;
    const filesToUpload = Array.from(files);
    
    // Check if adding these files would exceed the limit
    if (currentCount + filesToUpload.length > MAX_PHOTOS) {
      const remainingSlots = MAX_PHOTOS - currentCount;
      if (remainingSlots <= 0) {
        setUploadError(`Maximum ${MAX_PHOTOS} photos allowed. Please remove some photos first.`);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        return;
      }
      // Limit files to the remaining slots and show info message
      const originalFileCount = filesToUpload.length;
      const filesToSkip = originalFileCount - remainingSlots;
      if (filesToSkip > 0) {
        setUploadError(`Only ${remainingSlots} photo${remainingSlots > 1 ? 's' : ''} will be uploaded (${filesToSkip} file${filesToSkip > 1 ? 's' : ''} skipped). Maximum ${MAX_PHOTOS} photos allowed.`);
      }
      // Limit files to the remaining slots
      filesToUpload.splice(remainingSlots);
    }

    setUploading(true);

    try {
      const formData = new FormData();
      filesToUpload.forEach((file) => {
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
      form.setFieldValue('photos', newPhotos);

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

  const removePhoto = (index: number) => {
    const currentPhotos = form.getFieldValue('photos') || [];
    const photoToRemove = currentPhotos[index];

    // Track blob for deletion on save if it's a Vercel Blob URL
    if (photoToRemove && isVercelBlobUrl(photoToRemove)) {
      setPhotosToDelete((prev) => [...prev, photoToRemove]);
    }

    // Remove from form state immediately
    form.setFieldValue('photos', currentPhotos.filter((_: string, i: number) => i !== index));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">
            {listing ? 'Edit Listing' : 'New Listing'}
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <form.Field name="title">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name} className="font-sans">Title</Label>
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="Item title"
                    disabled={isSaving}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-sm font-medium text-destructive">
                      {field.state.meta.errors.map((e) => typeof e === 'string' ? e : (e as { message?: string })?.message ?? String(e)).join(', ')}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field name="price">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name} className="font-sans">Price</Label>
                  <Input
                    id={field.name}
                    type="number"
                    value={field.state.value || ''}
                    onChange={(e) => field.handleChange(e.target.value === '' ? 0 : Number(e.target.value))}
                    onBlur={field.handleBlur}
                    placeholder="Enter price"
                    disabled={isSaving}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-sm font-medium text-destructive">
                      {field.state.meta.errors.map((e) => typeof e === 'string' ? e : (e as { message?: string })?.message ?? String(e)).join(', ')}
                    </p>
                  )}
                </div>
              )}
            </form.Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <form.Field name="category">
              {(field) => (
                <div className="space-y-2">
                  <Label className="font-sans">Category</Label>
                  <Select
                    value={field.state.value}
                    onValueChange={(value) => field.handleChange(value as ListingCategory)}
                    disabled={isSaving}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {(Object.keys(CATEGORY_LABELS) as ListingCategory[]).map((cat) => (
                        <SelectItem key={cat} value={cat} className="font-sans">
                          {CATEGORY_LABELS[cat]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-sm font-medium text-destructive">
                      {field.state.meta.errors.map((e) => typeof e === 'string' ? e : (e as { message?: string })?.message ?? String(e)).join(', ')}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field name="status">
              {(field) => (
                <div className="space-y-2">
                  <Label className="font-sans">Status</Label>
                  <Select
                    value={field.state.value}
                    onValueChange={(value) => field.handleChange(value as ListingStatus)}
                    disabled={isSaving}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {(Object.keys(STATUS_LABELS) as ListingStatus[]).map((status) => (
                        <SelectItem key={status} value={status} className="font-sans">
                          {STATUS_LABELS[status]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-sm font-medium text-destructive">
                      {field.state.meta.errors.map((e) => typeof e === 'string' ? e : (e as { message?: string })?.message ?? String(e)).join(', ')}
                    </p>
                  )}
                </div>
              )}
            </form.Field>
          </div>

          <form.Field name="description">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name} className="font-sans">Description</Label>
                <Textarea
                  id={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Describe the item..."
                  rows={4}
                  disabled={isSaving}
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm font-medium text-destructive">
                    {field.state.meta.errors.map((e) => typeof e === 'string' ? e : (e as { message?: string })?.message ?? String(e)).join(', ')}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          {/* Photos */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="font-sans">Photos</Label>
              <span className="text-xs text-muted-foreground font-sans">
                {form.getFieldValue('photos')?.length || 0} / {MAX_PHOTOS}
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
                disabled={isSaving || uploading || (form.getFieldValue('photos')?.length || 0) >= MAX_PHOTOS}
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleUploadClick}
                disabled={isSaving || uploading || (form.getFieldValue('photos')?.length || 0) >= MAX_PHOTOS}
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
                <p className="text-xs text-destructive font-sans">
                  {uploadError}
                </p>
              )}
              <p className="text-xs text-muted-foreground font-sans">
                Supported formats: JPEG, PNG, WebP, GIF. Max 10MB per file. Maximum {MAX_PHOTOS} photos per listing.
              </p>
            </div>
            <form.Field name="photos">
              {(field) => (
                <>
                  {(field.state.value || []).length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {(field.state.value || []).map((photo: string, index: number) => (
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
                            onClick={() => removePhoto(index)}
                            className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            disabled={isSaving}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-sm font-medium text-destructive">
                      {field.state.meta.errors.map((e) => typeof e === 'string' ? e : (e as { message?: string })?.message ?? String(e)).join(', ')}
                    </p>
                  )}
                </>
              )}
            </form.Field>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSaving}>
              Cancel
            </Button>
            <form.Subscribe selector={(state) => state.isSubmitting}>
              {(isSubmitting) => (
                <Button type="submit" disabled={isSaving || isSubmitting}>
                  {isSaving || isSubmitting ? 'Saving...' : listing ? 'Save Changes' : 'Create Listing'}
                </Button>
              )}
            </form.Subscribe>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
