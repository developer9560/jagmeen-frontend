export default function FeaturedProductSkeleton() {
  return (
    <div className="bg-white overflow-hidden animate-pulse">
      <div className="aspect-[3/4] bg-cream/80" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-cream rounded w-4/5" />
        <div className="h-3 bg-cream/70 rounded w-full hidden sm:block" />
        <div className="h-4 bg-cream rounded w-1/3 mt-2" />
      </div>
    </div>
  );
}
