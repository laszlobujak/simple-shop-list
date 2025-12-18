'use client';

import { useState, useEffect } from 'react';
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
import { X, Plus } from 'lucide-react';

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
  const [photoUrl, setPhotoUrl] = useState('');
  const [urlError, setUrlError] = useState('');

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
    },
  });

  useEffect(() => {
    if (open) {
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
    }
  }, [listing, open]);

  const addPhoto = () => {
    const trimmedUrl = photoUrl.trim();
    if (!trimmedUrl) return;

    setUrlError('');
    const currentPhotos = form.getFieldValue('photos') || [];
    const newPhotos = [...currentPhotos, trimmedUrl];

    try {
      createListingSchema.shape.photos.parse(newPhotos);
      form.setFieldValue('photos', newPhotos);
      setPhotoUrl('');
    } catch (error: any) {
      const zodError = error.issues?.[0];
      setUrlError(zodError?.message || 'Invalid image URL');
    }
  };

  const removePhoto = (index: number) => {
    const currentPhotos = form.getFieldValue('photos') || [];
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
                      {field.state.meta.errors.map((e) => typeof e === 'string' ? e : e?.message).join(', ')}
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
                      {field.state.meta.errors.map((e) => typeof e === 'string' ? e : e?.message).join(', ')}
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
                      {field.state.meta.errors.map((e) => typeof e === 'string' ? e : e?.message).join(', ')}
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
                      {field.state.meta.errors.map((e) => typeof e === 'string' ? e : e?.message).join(', ')}
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
                    {field.state.meta.errors.map((e) => typeof e === 'string' ? e : e?.message).join(', ')}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          {/* Photos */}
          <div className="space-y-2">
            <Label className="font-sans">Photos</Label>
            <div className="flex gap-2">
              <div className="flex-1 space-y-1">
                <Input
                  value={photoUrl}
                  onChange={(e) => {
                    setPhotoUrl(e.target.value);
                    setUrlError('');
                  }}
                  placeholder="Enter image URL (https://images.unsplash.com/...)"
                  className={urlError ? 'border-destructive' : ''}
                  disabled={isSaving}
                />
                {urlError && (
                  <p className="text-xs text-destructive font-sans">
                    {urlError}
                  </p>
                )}
              </div>
              <Button type="button" variant="outline" onClick={addPhoto} disabled={isSaving}>
                <Plus className="h-4 w-4" />
              </Button>
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
                      {field.state.meta.errors.map((e) => typeof e === 'string' ? e : e?.message).join(', ')}
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
