export default function DashboardLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse space-y-6">
        {/* Header skeleton */}
        <div className="flex justify-between items-center">
          <div className="h-8 bg-muted rounded w-48"></div>
          <div className="h-10 bg-muted rounded w-32"></div>
        </div>

        {/* Table skeleton */}
        <div className="border rounded-lg">
          <div className="p-4 border-b">
            <div className="h-6 bg-muted rounded w-32"></div>
          </div>
          <div className="divide-y">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="p-4 flex items-center gap-4">
                <div className="w-16 h-16 bg-muted rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-5 bg-muted rounded w-1/3"></div>
                  <div className="h-4 bg-muted rounded w-1/4"></div>
                </div>
                <div className="h-8 bg-muted rounded w-24"></div>
                <div className="h-8 bg-muted rounded w-8"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
