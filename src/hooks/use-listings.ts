import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchListings,
  createListing,
  updateListing,
  deleteListing
} from '@/lib/listings-client';
import { Listing } from '@/types/listing';

// Query keys
export const listingsKeys = {
  all: ['listings'] as const,
  lists: () => [...listingsKeys.all, 'list'] as const,
  list: (filters?: Record<string, unknown>) => [...listingsKeys.lists(), filters] as const,
  details: () => [...listingsKeys.all, 'detail'] as const,
  detail: (id: string) => [...listingsKeys.details(), id] as const,
};

// Fetch all listings
export function useListings() {
  return useQuery({
    queryKey: listingsKeys.lists(),
    queryFn: fetchListings,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Create listing mutation
export function useCreateListing() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createListing,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: listingsKeys.lists() });
    },
  });
}

// Update listing mutation
export function useUpdateListing() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Listing> }) =>
      updateListing(id, data),
    onMutate: async ({ id, data }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: listingsKeys.lists() });

      // Snapshot the previous value
      const previousListings = queryClient.getQueryData<Listing[]>(listingsKeys.lists());

      // Optimistically update to the new value
      if (previousListings) {
        queryClient.setQueryData<Listing[]>(
          listingsKeys.lists(),
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
        queryClient.setQueryData(listingsKeys.lists(), context.previousListings);
      }
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: listingsKeys.lists() });
    },
  });
}

// Delete listing mutation
export function useDeleteListing() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteListing,
    onMutate: async (id: string) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: listingsKeys.lists() });

      // Snapshot the previous value
      const previousListings = queryClient.getQueryData<Listing[]>(listingsKeys.lists());

      // Optimistically update to the new value
      if (previousListings) {
        queryClient.setQueryData<Listing[]>(
          listingsKeys.lists(),
          previousListings.filter(listing => listing.id !== id)
        );
      }

      // Return a context object with the snapshotted value
      return { previousListings };
    },
    onError: (_err, _id, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousListings) {
        queryClient.setQueryData(listingsKeys.lists(), context.previousListings);
      }
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: listingsKeys.lists() });
    },
  });
}
