export default function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full rounded-lg border border-gray-200 bg-white/90 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none ${className}`}
      {...props}
    />
  );
}
