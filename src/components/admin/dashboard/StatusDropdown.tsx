'use client';

import { Listing, ListingStatus, STATUS_LABELS } from '@/types/listing';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface StatusDropdownProps {
  listing: Listing;
  onStatusChange: (listing: Listing, status: ListingStatus) => void;
}

function getStatusVariant(status: ListingStatus) {
  switch (status) {
    case 'active': return 'default';
    case 'reserved': return 'secondary';
    case 'sold': return 'outline';
    default: return 'outline';
  }
}

export function StatusDropdown({ listing, onStatusChange }: StatusDropdownProps) {
  return (
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
            onClick={() => onStatusChange(listing, status)}
            className="font-sans"
          >
            {STATUS_LABELS[status]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
