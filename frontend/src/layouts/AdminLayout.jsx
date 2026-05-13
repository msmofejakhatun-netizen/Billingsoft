import { useDispatch, useSelector } from 'react-redux';
import { LogOut, Moon, Sun } from 'lucide-react';
import { Sidebar } from '../components/Sidebar.jsx';
import { toggleDarkMode } from '../features/settings/uiSlice.js';
import { logoutUser } from '../features/auth/authSlice.js';

export function AdminLayout({ children }) {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.ui.darkMode);
  const user = useSelector((state) => state.auth.user);

  return <div className={darkMode ? 'dark' : ''}><div className="flex min-h-screen"><Sidebar /><main className="flex-1 p-4 lg:p-8"><header className="mb-6 flex items-center justify-between gap-4"><div><p className="text-sm text-slate-500">Welcome back{user?.name ? `, ${user.name}` : ''}</p><h2 className="text-2xl font-bold">Restaurant Operations Center</h2><p className="text-xs uppercase tracking-wide text-brand-600">{user?.role || 'merchant'}</p></div><div className="flex items-center gap-2"><button className="rounded-xl border p-2 dark:border-slate-700" onClick={() => dispatch(toggleDarkMode())} aria-label="Toggle dark mode">{darkMode ? <Sun /> : <Moon />}</button><button className="rounded-xl border p-2 text-red-600 dark:border-slate-700" onClick={() => dispatch(logoutUser())} aria-label="Logout"><LogOut /></button></div></header>{children}</main></div></div>;
}
