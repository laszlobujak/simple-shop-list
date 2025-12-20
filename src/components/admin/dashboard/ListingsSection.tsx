'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useAdminListings, useAdminCreateListing, useAdminUpdateListing, useAdminDeleteListing } from '@/hooks/use-admin-listings';
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
  return new Intl.NumberFormat('hu-HU', {
    style: 'currency',
    currency: 'HUF',
    minimumFractionDigits: 0,
  }).format(price);
}

export function ListingsSection() {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingListing, setEditingListing] = useState<Listing | null>(null);

  // React Query hooks
  const { data: listings = [], isLoading, error } = useAdminListings();
  const createMutation = useAdminCreateListing();
  const updateMutation = useAdminUpdateListing();
  const deleteMutation = useAdminDeleteListing();

  // Show error toast if query fails
  if (error) {
    toast({
      title: 'Error',
      description: 'Failed to load listings',
      variant: 'destructive',
    });
  }

  const handleSave = async (listing: Listing) => {
    try {
      if (editingListing) {
        await updateMutation.mutateAsync({
          id: listing.id,
          data: listing,
        });
        toast({
          title: 'Listing updated',
          description: `"${listing.title}" has been saved.`,
        });
      } else {
        await createMutation.mutateAsync(listing);
        toast({
          title: 'Listing created',
          description: `"${listing.title}" has been created.`,
        });
      }

      setDialogOpen(false);
      setEditingListing(null);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save listing',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (listing: Listing) => {
    if (confirm(`Delete "${listing.title}"?`)) {
      try {
        await deleteMutation.mutateAsync(listing.id);
        toast({
          title: 'Listing deleted',
          description: `"${listing.title}" has been removed.`,
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to delete listing',
          variant: 'destructive',
        });
      }
    }
  };

  const handleStatusChange = async (listing: Listing, status: ListingStatus) => {
    try {
      await updateMutation.mutateAsync({
        id: listing.id,
        data: { ...listing, status },
      });
      toast({
        title: 'Status updated',
        description: `"${listing.title}" is now ${STATUS_LABELS[status]}.`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update status',
        variant: 'destructive',
      });
    }
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
        {isLoading ? (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">Loading listings...</p>
          </div>
        ) : listings.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">No listings yet. Create your first listing!</p>
          </div>
        ) : (
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
              {[...listings].sort((a, b) => a.title.localeCompare(b.title)).map((listing) => {
                const isDeleting = deleteMutation.isPending && deleteMutation.variables === listing.id;
                const isUpdating = updateMutation.isPending && updateMutation.variables?.id === listing.id;

                return (
                  <TableRow
                    key={listing.id}
                    className={`
                      transition-all duration-200
                      ${isDeleting ? 'opacity-50 bg-destructive/5' : ''}
                      ${isUpdating ? 'bg-accent/5' : ''}
                    `}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-sm overflow-hidden bg-muted flex-shrink-0 relative">
                          {listing.photos[0] && (
                            <Image
                              src={listing.photos[0]}
                              alt={listing.title}
                              fill
                              className="object-cover"
                            />
                          )}
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
                      <StatusDropdown
                        listing={listing}
                        onStatusChange={handleStatusChange}
                        disabled={isDeleting || isUpdating}
                      />
                    </TableCell>
                    <TableCell>
                      <ActionsDropdown
                        listing={listing}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        disabled={isDeleting || isUpdating}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>

      <ListingDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        listing={editingListing}
        onSave={handleSave}
        isSaving={createMutation.isPending || updateMutation.isPending}
      />
    </main>
  );
}
