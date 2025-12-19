import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchListings,
  createListing,
  updateListing,
  deleteListing
} from '@/lib/listings-client';
import { Listing } from '@/types/listing';

// Admin query keys - separate namespace from public keys
export const adminListingsKeys = {
  all: ['admin-listings'] as const,
  lists: () => [...adminListingsKeys.all, 'list'] as const,
};

// Admin hook - NO CACHING for real-time updates
export function useAdminListings() {
  return useQuery({
    queryKey: adminListingsKeys.lists(),
    queryFn: fetchListings,
    staleTime: 0, // Always fetch fresh data
    gcTime: 0, // Don't cache in memory
    refetchOnWindowFocus: true, // Refetch when admin returns to tab
    refetchOnMount: true, // Always refetch on mount
  });
}

// Admin create mutation
export function useAdminCreateListing() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createListing,
    onSuccess: () => {
      // Invalidate admin queries only
      queryClient.invalidateQueries({ queryKey: adminListingsKeys.lists() });
    },
  });
}

// Admin update mutation with optimistic updates
export function useAdminUpdateListing() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Listing> }) =>
      updateListing(id, data),
    onMutate: async ({ id, data }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: adminListingsKeys.lists() });

      // Snapshot the previous value
      const previousListings = queryClient.getQueryData<Listing[]>(adminListingsKeys.lists());

      // Optimistically update to the new value
      if (previousListings) {
        queryClient.setQueryData<Listing[]>(
          adminListingsKeys.lists(),
          previousListings.map(listing =>
            listing.id === id ? { ...listing, ...data } : listing
          )
        );
      }

      // Return a context object with the snapshotted value
      return { previousListings };
    },
    onError: (_err, _variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousListings) {
        queryClient.setQueryData(adminListingsKeys.lists(), context.previousListings);
      }
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: adminListingsKeys.lists() });
    },
  });
}

// Admin delete mutation with optimistic updates
export function useAdminDeleteListing() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteListing,
    onMutate: async (id: string) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: adminListingsKeys.lists() });

      // Snapshot the previous value
      const previousListings = queryClient.getQueryData<Listing[]>(adminListingsKeys.lists());

      // Optimistically update to the new value
      if (previousListings) {
        queryClient.setQueryData<Listing[]>(
          adminListingsKeys.lists(),
          previousListings.filter(listing => listing.id !== id)
        );
      }

      // Return a context object with the snapshotted value
      return { previousListings };
    },
    onError: (_err, _id, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousListings) {
        queryClient.setQueryData(adminListingsKeys.lists(), context.previousListings);
      }
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: adminListingsKeys.lists() });
    },
  });
}
