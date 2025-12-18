'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Listing, ListingCategory, ListingStatus, CATEGORY_LABELS, STATUS_LABELS } from '@/types/listing';
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
}

const defaultListing: Omit<Listing, 'id' | 'createdAt' | 'updatedAt'> = {
  title: '',
  category: 'other',
  price: 0,
  description: '',
  photos: [],
  status: 'draft',
};

export function ListingDialog({ open, onOpenChange, listing, onSave }: ListingDialogProps) {
  const [form, setForm] = useState(defaultListing);
  const [photoUrl, setPhotoUrl] = useState('');
  const [urlError, setUrlError] = useState('');

  useEffect(() => {
    if (listing) {
      setForm({
        title: listing.title,
        category: listing.category,
        price: listing.price,
        description: listing.description,
        photos: listing.photos,
        status: listing.status,
      });
    } else {
      setForm(defaultListing);
    }
  }, [listing, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const now = new Date().toISOString();
    const savedListing: Listing = {
      id: listing?.id || crypto.randomUUID(),
      ...form,
      createdAt: listing?.createdAt || now,
      updatedAt: now,
    };
    
    onSave(savedListing);
  };

  const isValidUrl = (url: string): boolean => {
    try {
      const urlObj = new URL(url);
      // Only allow https URLs and common image hosting domains
      const allowedDomains = [
        'images.unsplash.com',
        'unsplash.com',
        'imgur.com',
        'i.imgur.com',
        'cloudinary.com',
        'res.cloudinary.com',
      ];

      if (urlObj.protocol !== 'https:') {
        setUrlError('Only HTTPS URLs are allowed for security');
        return false;
      }

      const isAllowedDomain = allowedDomains.some(domain =>
        urlObj.hostname === domain || urlObj.hostname.endsWith(`.${domain}`)
      );

      if (!isAllowedDomain) {
        setUrlError(`Only images from allowed domains are permitted: ${allowedDomains.join(', ')}`);
        return false;
      }

      return true;
    } catch {
      setUrlError('Please enter a valid URL');
      return false;
    }
  };

  const addPhoto = () => {
    const trimmedUrl = photoUrl.trim();
    if (!trimmedUrl) return;

    setUrlError('');

    if (isValidUrl(trimmedUrl)) {
      setForm({ ...form, photos: [...form.photos, trimmedUrl] });
      setPhotoUrl('');
    }
  };

  const removePhoto = (index: number) => {
    setForm({ ...form, photos: form.photos.filter((_, i) => i !== index) });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">
            {listing ? 'Edit Listing' : 'New Listing'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="font-sans">Title</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Item title"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price" className="font-sans">Price</Label>
              <Input
                id="price"
                type="number"
                value={form.price || ''}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                placeholder="0"
                min="0"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category" className="font-sans">Category</Label>
              <Select
                value={form.category}
                onValueChange={(value: ListingCategory) => setForm({ ...form, category: value })}
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
            </div>
            <div className="space-y-2">
              <Label htmlFor="status" className="font-sans">Status</Label>
              <Select
                value={form.status}
                onValueChange={(value: ListingStatus) => setForm({ ...form, status: value })}
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
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="font-sans">Description</Label>
            <Textarea
              id="description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Describe the item..."
              rows={4}
            />
          </div>

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
                />
                {urlError && (
                  <p className="text-xs text-destructive font-sans">
                    {urlError}
                  </p>
                )}
              </div>
              <Button type="button" variant="outline" onClick={addPhoto}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {form.photos.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {form.photos.map((photo, index) => (
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
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {listing ? 'Save Changes' : 'Create Listing'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
