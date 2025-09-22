export function Card({ className = "", children }) {
  return <div className={`rounded-2xl bg-white/80 backdrop-blur shadow-2xl ${className}`}>{children}</div>;
}
export function CardHeader({ className = "", children }) {
  return <div className={`px-6 pt-6 ${className}`}>{children}</div>;
}
export function CardTitle({ className = "", children }) {
  return <h2 className={`text-2xl font-bold ${className}`}>{children}</h2>;
}
export function CardContent({ className = "", children }) {
  return <div className={`px-6 pb-6 ${className}`}>{children}</div>;
}
