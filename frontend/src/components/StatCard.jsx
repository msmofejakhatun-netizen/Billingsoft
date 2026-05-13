export function StatCard({ label, value, helper }) {
  return <div className="card"><p className="text-sm text-slate-500">{label}</p><h3 className="mt-2 text-3xl font-bold">{value}</h3><p className="mt-1 text-xs text-emerald-500">{helper}</p></div>;
}
