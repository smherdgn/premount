// Semi-transparent full-viewport overlay used during route transitions.
// Keeps underlying UI interactive state intact (pointer-events none).
export default function TransparentLoader() {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-[1px] pointer-events-none">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/40 border-t-blue-500" />
    </div>
  );
}
