import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../features/auth/authSlice.js';

export function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, status, error } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', role: 'merchant' });

  if (token) return <Navigate to="/" replace />;

  const submit = async (event) => {
    event.preventDefault();
    try {
      await dispatch(register(form)).unwrap();
      navigate('/', { replace: true });
    } catch (_error) {
      // The Redux auth slice displays the API error message.
    }
  };

  return <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 dark:bg-slate-950"><form onSubmit={submit} className="card w-full max-w-lg space-y-4"><div><p className="text-sm text-brand-600">Billingsoft</p><h1 className="text-3xl font-bold">Create account</h1><p className="text-sm text-slate-500">Register as a merchant. Super admin registration is server-gated.</p></div>{error && <div className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</div>}<div className="grid gap-4 sm:grid-cols-2"><label className="block text-sm font-medium">Name<input className="mt-1 w-full rounded-xl border p-3 dark:border-slate-700 dark:bg-slate-900" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required /></label><label className="block text-sm font-medium">Phone<input className="mt-1 w-full rounded-xl border p-3 dark:border-slate-700 dark:bg-slate-900" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} /></label></div><label className="block text-sm font-medium">Email<input className="mt-1 w-full rounded-xl border p-3 dark:border-slate-700 dark:bg-slate-900" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required /></label><label className="block text-sm font-medium">Password<input className="mt-1 w-full rounded-xl border p-3 dark:border-slate-700 dark:bg-slate-900" type="password" minLength="8" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required /></label><label className="block text-sm font-medium">Role<select className="mt-1 w-full rounded-xl border p-3 dark:border-slate-700 dark:bg-slate-900" value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })}><option value="merchant">Merchant</option><option value="super_admin">Super Admin</option></select></label><button className="btn-primary w-full" disabled={status === 'loading'}>{status === 'loading' ? 'Creating...' : 'Register'}</button><p className="text-center text-sm text-slate-500">Already have an account? <Link className="font-semibold text-brand-600" to="/login">Login</Link></p></form></main>;
}
