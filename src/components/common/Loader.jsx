export default function Loader({ message, inline = false }) {
  if (inline) {
    return (
      <div className="inline-flex items-center gap-2">
        <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        {message && <span className="text-xs text-gray-500">{message}</span>}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        {message && <p className="text-sm text-gray-500">{message}</p>}
      </div>
    </div>
  );
}
