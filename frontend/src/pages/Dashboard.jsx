import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { StatCard } from '../components/StatCard.jsx';

const sales = [{ day: 'Mon', value: 18000 }, { day: 'Tue', value: 24000 }, { day: 'Wed', value: 22000 }, { day: 'Thu', value: 31000 }, { day: 'Fri', value: 46000 }, { day: 'Sat', value: 58000 }];

export function Dashboard() {
  return <div className="space-y-6"><section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"><StatCard label="Today Sales" value="₹58,420" helper="+18% vs yesterday" /><StatCard label="Live Orders" value="42" helper="12 KOT pending" /><StatCard label="Occupied Tables" value="18/30" helper="60% occupancy" /><StatCard label="Inventory Alerts" value="7" helper="Low stock items" /></section><section className="grid gap-6 xl:grid-cols-3"><div className="card xl:col-span-2"><h3 className="mb-4 text-lg font-semibold">Sales Analytics</h3><ResponsiveContainer width="100%" height={280}><LineChart data={sales}><XAxis dataKey="day" /><YAxis /><Tooltip /><Line type="monotone" dataKey="value" stroke="#ea580c" strokeWidth={3} /></LineChart></ResponsiveContainer></div><div className="card"><h3 className="mb-4 text-lg font-semibold">Live Order Tracking</h3>{['Table 5 preparing', 'Table 8 ready', 'Parcel #102 pending', 'Table 2 billing'].map((item) => <div key={item} className="mb-3 rounded-xl bg-slate-50 p-3 text-sm dark:bg-slate-800">{item}</div>)}</div></section></div>;
}
