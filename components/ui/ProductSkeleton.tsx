export default function ProductSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden flex flex-col h-full animate-pulse">
      {/* Image placeholder */}
      <div className="aspect-square bg-gray-100 w-full"></div>
      
      {/* Content placeholder */}
      <div className="p-5 flex flex-col flex-1">
        {/* Brand */}
        <div className="h-3 bg-gray-200 rounded w-1/4 mb-3"></div>
        
        {/* Title */}
        <div className="h-5 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-5 bg-gray-200 rounded w-2/3 mb-4"></div>
        
        {/* Rating */}
        <div className="flex gap-1 mb-6">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="w-4 h-4 bg-gray-200 rounded-full"></div>
          ))}
        </div>
        
        {/* Price & CTA */}
        <div className="mt-auto">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    </div>
  );
}
