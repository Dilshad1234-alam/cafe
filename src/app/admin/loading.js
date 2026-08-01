export default function AdminLoading() {
  return (
    <div className="flex items-center justify-center h-full min-h-[50vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-brand-yellow rounded-full animate-spin"></div>
        <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Loading</p>
      </div>
    </div>
  );
}
