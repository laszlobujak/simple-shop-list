'use client';

import { useState, useEffect } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { isVercelBlobUrl } from '@/lib/blob-utils';
import { PhotoUploadSection } from './PhotoUploadSection';
import { FormField, getFieldError } from './FormField';

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
        setPhotosToDelete([]);
      } catch (error) {
        console.error('Error deleting blobs:', error);
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
      if (photosToDelete.length > 0) {
        setPhotosToDelete([]);
      }
    }
  }, [listing, open]);

  const removePhoto = (index: number) => {
    const currentPhotos = form.getFieldValue('photos') || [];
    const photoToRemove = currentPhotos[index];

    if (photoToRemove && isVercelBlobUrl(photoToRemove)) {
      setPhotosToDelete((prev) => [...prev, photoToRemove]);
    }

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
                <FormField
                  label="Title"
                  htmlFor={field.name}
                  error={getFieldError(field.state.meta.errors)}
                >
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="Item title"
                    disabled={isSaving}
                  />
                </FormField>
              )}
            </form.Field>

            <form.Field name="price">
              {(field) => (
                <FormField
                  label="Price"
                  htmlFor={field.name}
                  error={getFieldError(field.state.meta.errors)}
                >
                  <Input
                    id={field.name}
                    type="number"
                    value={field.state.value || ''}
                    onChange={(e) => field.handleChange(e.target.value === '' ? 0 : Number(e.target.value))}
                    onBlur={field.handleBlur}
                    placeholder="Enter price"
                    disabled={isSaving}
                  />
                </FormField>
              )}
            </form.Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <form.Field name="category">
              {(field) => (
                <FormField
                  label="Category"
                  error={getFieldError(field.state.meta.errors)}
                >
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
                </FormField>
              )}
            </form.Field>

            <form.Field name="status">
              {(field) => (
                <FormField
                  label="Status"
                  error={getFieldError(field.state.meta.errors)}
                >
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
                </FormField>
              )}
            </form.Field>
          </div>

          <form.Field name="description">
            {(field) => (
              <FormField
                label="Description"
                htmlFor={field.name}
                error={getFieldError(field.state.meta.errors)}
              >
                <Textarea
                  id={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Describe the item..."
                  rows={4}
                  disabled={isSaving}
                />
              </FormField>
            )}
          </form.Field>

          <form.Field name="photos">
            {(field) => (
              <div className="space-y-2">
                <PhotoUploadSection
                  photos={field.state.value || []}
                  onPhotosChange={(photos) => field.handleChange(photos)}
                  onPhotoRemove={removePhoto}
                  disabled={isSaving}
                />
                {getFieldError(field.state.meta.errors) && (
                  <p className="text-sm font-medium text-destructive">
                    {getFieldError(field.state.meta.errors)}
                  </p>
                )}
              </div>
            )}
          </form.Field>

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
