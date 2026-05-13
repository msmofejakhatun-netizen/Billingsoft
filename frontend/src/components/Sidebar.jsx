import { BarChart3, ChefHat, CreditCard, LayoutDashboard, Package, ReceiptText, Settings, Store, Table2, Utensils } from 'lucide-react';

const items = [
  ['Dashboard', LayoutDashboard], ['Live Orders', ReceiptText], ['Billing POS', CreditCard], ['Kitchen KDS', ChefHat],
  ['Tables', Table2], ['Menu', Utensils], ['Inventory', Package], ['Reports', BarChart3], ['Branches', Store], ['Settings', Settings]
];

export function Sidebar() {
  return <aside className="hidden min-h-screen w-72 border-r border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 lg:block">
    <div className="mb-8 flex items-center gap-3"><div className="rounded-2xl bg-brand-600 p-3 text-white"><Utensils /></div><div><h1 className="text-xl font-bold">Billingsoft</h1><p className="text-xs text-slate-500">Restaurant SaaS</p></div></div>
    <nav className="space-y-1">{items.map(([label, Icon]) => <a key={label} href="#" className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium hover:bg-brand-50 hover:text-brand-700 dark:hover:bg-slate-800"><Icon size={18} />{label}</a>)}</nav>
  </aside>;
}
