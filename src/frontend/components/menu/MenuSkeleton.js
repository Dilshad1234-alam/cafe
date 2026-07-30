export default function MenuSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 flex flex-col h-[380px]">
          {/* Image skeleton */}
          <div className="h-48 w-full bg-gray-200"></div>
          
          {/* Content skeleton */}
          <div className="p-4 flex flex-col flex-grow">
            <div className="flex justify-between items-start mb-4">
              <div className="h-6 bg-gray-200 rounded w-2/3"></div>
              <div className="h-5 bg-gray-200 rounded w-10"></div>
            </div>
            
            <div className="space-y-2 mb-6">
              <div className="h-4 bg-gray-100 rounded w-full"></div>
              <div className="h-4 bg-gray-100 rounded w-4/5"></div>
            </div>
            
            <div className="flex items-center justify-between mt-auto">
              <div className="space-y-2">
                <div className="h-6 bg-gray-200 rounded w-16"></div>
                <div className="h-3 bg-gray-100 rounded w-20"></div>
              </div>
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
