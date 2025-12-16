'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { getListings, saveListing, deleteListing } from '@/data/mockListings';
import { Listing, ListingStatus, STATUS_LABELS, CATEGORY_LABELS } from '@/types/listing';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ListingDialog } from '@/components/admin/ListingDialog';
import { Plus, MoreHorizontal, Pencil, Trash2, LogOut, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminDashboard() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [listings, setListings] = useState<Listing[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingListing, setEditingListing] = useState<Listing | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/admin');
      return;
    }
    setListings(getListings());
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusVariant = (status: ListingStatus) => {
    switch (status) {
      case 'active': return 'default';
      case 'reserved': return 'secondary';
      case 'sold': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-serif text-xl font-semibold text-foreground">
              Estate & Co.
            </Link>
            <Badge variant="outline" className="font-sans text-xs">Admin</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="sm" className="font-sans gap-2">
                <Eye className="h-4 w-4" />
                View Site
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={logout} className="font-sans gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
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

        {/* Listings Table */}
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
                      <div className="w-12 h-12 rounded-sm overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={listing.photos[0]}
                          alt={listing.title}
                          className="w-full h-full object-cover"
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
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-auto p-0">
                          <Badge variant={getStatusVariant(listing.status)} className="font-sans text-xs cursor-pointer">
                            {STATUS_LABELS[listing.status]}
                          </Badge>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        {(['draft', 'active', 'reserved', 'sold', 'inactive'] as ListingStatus[]).map((status) => (
                          <DropdownMenuItem
                            key={status}
                            onClick={() => handleStatusChange(listing, status)}
                            className="font-sans"
                          >
                            {STATUS_LABELS[status]}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => { setEditingListing(listing); setDialogOpen(true); }}
                          className="font-sans gap-2"
                        >
                          <Pencil className="h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(listing)}
                          className="font-sans gap-2 text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>

      <ListingDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        listing={editingListing}
        onSave={handleSave}
      />
    </div>
  );
}

