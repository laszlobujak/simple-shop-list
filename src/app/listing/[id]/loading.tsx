export default function ListingLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image skeleton */}
          <div className="space-y-4">
            <div className="aspect-square bg-muted rounded-sm"></div>
            <div className="flex gap-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-20 h-20 bg-muted rounded-sm"></div>
              ))}
            </div>
          </div>

          {/* Details skeleton */}
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="h-4 bg-muted rounded w-1/4"></div>
              <div className="h-10 bg-muted rounded w-3/4"></div>
              <div className="h-8 bg-muted rounded w-1/3"></div>
            </div>

            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-3/4"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="h-20 bg-muted rounded"></div>
              <div className="h-20 bg-muted rounded"></div>
            </div>

            <div className="h-12 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
