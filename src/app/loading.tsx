export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="animate-pulse space-y-8">
        {/* Header skeleton */}
        <div className="h-10 bg-muted rounded w-1/3"></div>

        {/* Grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="aspect-square bg-muted rounded-sm"></div>
              <div className="h-4 bg-muted rounded w-1/4"></div>
              <div className="h-6 bg-muted rounded w-3/4"></div>
              <div className="h-5 bg-muted rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
