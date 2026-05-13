import { useDispatch, useSelector } from 'react-redux';
import { Moon, Sun } from 'lucide-react';
import { Sidebar } from '../components/Sidebar.jsx';
import { toggleDarkMode } from '../features/settings/uiSlice.js';

export function AdminLayout({ children }) {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.ui.darkMode);
  return <div className={darkMode ? 'dark' : ''}><div className="flex min-h-screen"><Sidebar /><main className="flex-1 p-4 lg:p-8"><header className="mb-6 flex items-center justify-between"><div><p className="text-sm text-slate-500">Welcome back</p><h2 className="text-2xl font-bold">Restaurant Operations Center</h2></div><button className="rounded-xl border p-2 dark:border-slate-700" onClick={() => dispatch(toggleDarkMode())}>{darkMode ? <Sun /> : <Moon />}</button></header>{children}</main></div></div>;
}
