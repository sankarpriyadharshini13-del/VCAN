export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-dark">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-saffron border-t-transparent" />
        <p className="text-white/60 text-sm">Loading...</p>
      </div>
    </div>
  );
}
