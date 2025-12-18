'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Listing, ListingCategory, ListingStatus, CATEGORY_LABELS, STATUS_LABELS } from '@/types/listing';
import { createListingSchema, updateListingSchema, CreateListingInput, UpdateListingInput } from '@/lib/validations/listing';
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { X, Plus } from 'lucide-react';

interface ListingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  listing: Listing | null;
  onSave: (listing: Listing) => void;
  isSaving?: boolean;
}

const defaultListing: CreateListingInput = {
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

  const form = useForm<CreateListingInput | UpdateListingInput>({
    resolver: zodResolver(listing ? updateListingSchema : createListingSchema),
    defaultValues: defaultListing,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
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
      form.reset(defaultListing);
    }
  }, [listing, open, form]);

  const handleSubmit = async (data: CreateListingInput | UpdateListingInput) => {
    // Validation already passed if we reach here
    const now = new Date().toISOString();

    // When editing, merge with existing listing data
    // When creating, use all data from form
    const savedListing: Listing = listing
      ? {
          ...listing,
          ...data,
          updatedAt: now,
        }
      : {
          id: crypto.randomUUID(),
          ...(data as CreateListingInput),
          createdAt: now,
          updatedAt: now,
        };

    onSave(savedListing);
  };

  const handleInvalidSubmit = (errors: any) => {
    console.log('Form validation errors:', errors);
  };

  const addPhoto = () => {
    const trimmedUrl = photoUrl.trim();
    if (!trimmedUrl) return;

    setUrlError('');

    const currentPhotos = form.getValues('photos') || [];

    // Add photo and let form validation handle it
    const newPhotos = [...currentPhotos, trimmedUrl];

    try {
      // Validate the entire photos array
      createListingSchema.shape.photos.parse(newPhotos);
      form.setValue('photos', newPhotos, { shouldValidate: true });
      setPhotoUrl('');
    } catch (error: any) {
      const zodError = error.issues?.[0];
      setUrlError(zodError?.message || 'Invalid image URL');
    }
  };

  const removePhoto = (index: number) => {
    const currentPhotos = form.getValues('photos') || [];
    form.setValue('photos', currentPhotos.filter((_, i) => i !== index), { shouldValidate: true });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">
            {listing ? 'Edit Listing' : 'New Listing'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit, handleInvalidSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-sans">Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Item title"
                        disabled={isSaving}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-sans">Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter price"
                        disabled={isSaving}
                        value={field.value || ''}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value === '' ? 0 : Number(value));
                        }}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-sans">Category</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={isSaving}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {(Object.keys(CATEGORY_LABELS) as ListingCategory[]).map((cat) => (
                          <SelectItem key={cat} value={cat} className="font-sans">
                            {CATEGORY_LABELS[cat]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-sans">Status</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={isSaving}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {(Object.keys(STATUS_LABELS) as ListingStatus[]).map((status) => (
                          <SelectItem key={status} value={status} className="font-sans">
                            {STATUS_LABELS[status]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-sans">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Describe the item..."
                      rows={4}
                      disabled={isSaving}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
              {(form.watch('photos') || []).length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {(form.watch('photos') || []).map((photo, index) => (
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
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSaving}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? 'Saving...' : listing ? 'Save Changes' : 'Create Listing'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
