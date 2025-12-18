'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getListings, saveListing, deleteListing } from '@/data/mockListings';
import { Listing, ListingStatus, STATUS_LABELS, CATEGORY_LABELS } from '@/types/listing';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ListingDialog } from '@/components/admin/ListingDialog';
import { StatusDropdown } from './StatusDropdown';
import { ActionsDropdown } from './ActionsDropdown';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price);
}

export function ListingsSection() {
  const { toast } = useToast();
  const [listings, setListings] = useState<Listing[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingListing, setEditingListing] = useState<Listing | null>(null);

  useEffect(() => {
    setListings(getListings());
  }, []);

  const handleSave = (listing: Listing) => {
    saveListing(listing);
    setListings(getListings());
    setDialogOpen(false);
    setEditingListing(null);
    toast({
      title: editingListing ? 'Listing updated' : 'Listing created',
      description: `"${listing.title}" has been saved.`,
    });
  };

  const handleDelete = (listing: Listing) => {
    if (confirm(`Delete "${listing.title}"?`)) {
      deleteListing(listing.id);
      setListings(getListings());
      toast({
        title: 'Listing deleted',
        description: `"${listing.title}" has been removed.`,
      });
    }
  };

  const handleStatusChange = (listing: Listing, status: ListingStatus) => {
    const updated = { ...listing, status, updatedAt: new Date().toISOString() };
    saveListing(updated);
    setListings(getListings());
    toast({
      title: 'Status updated',
      description: `"${listing.title}" is now ${STATUS_LABELS[status]}.`,
    });
  };

  const handleEdit = (listing: Listing) => {
    setEditingListing(listing);
    setDialogOpen(true);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-3xl font-medium text-foreground">Listings</h1>
          <p className="font-sans text-muted-foreground mt-1">
            Manage your marketplace inventory
          </p>
        </div>
        <Button 
          onClick={() => { setEditingListing(null); setDialogOpen(true); }}
          className="font-sans gap-2"
        >
          <Plus className="h-4 w-4" />
          New Listing
        </Button>
      </div>

      <div className="border border-border rounded-lg overflow-hidden bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-sans">Item</TableHead>
              <TableHead className="font-sans">Category</TableHead>
              <TableHead className="font-sans">Price</TableHead>
              <TableHead className="font-sans">Status</TableHead>
              <TableHead className="font-sans w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {listings.map((listing) => (
              <TableRow key={listing.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-sm overflow-hidden bg-muted flex-shrink-0 relative">
                      <Image
                        src={listing.photos[0]}
                        alt={listing.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="font-sans font-medium">{listing.title}</span>
                  </div>
                </TableCell>
                <TableCell className="font-sans text-muted-foreground">
                  {CATEGORY_LABELS[listing.category]}
                </TableCell>
                <TableCell className="font-sans">
                  {formatPrice(listing.price)}
                </TableCell>
                <TableCell>
                  <StatusDropdown listing={listing} onStatusChange={handleStatusChange} />
                </TableCell>
                <TableCell>
                  <ActionsDropdown 
                    listing={listing} 
                    onEdit={handleEdit} 
                    onDelete={handleDelete} 
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ListingDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        listing={editingListing}
        onSave={handleSave}
      />
    </main>
  );
}
