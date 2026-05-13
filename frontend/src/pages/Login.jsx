import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice.js';

export function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { token, status, error } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ email: '', password: '' });
  const from = location.state?.from?.pathname || '/';

  if (token) return <Navigate to={from} replace />;

  const submit = async (event) => {
    event.preventDefault();
    try {
      await dispatch(login(form)).unwrap();
      navigate(from, { replace: true });
    } catch (_error) {
      // The Redux auth slice displays the API error message.
    }
  };

  return <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 dark:bg-slate-950"><form onSubmit={submit} className="card w-full max-w-md space-y-4"><div><p className="text-sm text-brand-600">Billingsoft</p><h1 className="text-3xl font-bold">Sign in</h1><p className="text-sm text-slate-500">Access Super Admin or Merchant dashboards.</p></div>{error && <div className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</div>}<label className="block text-sm font-medium">Email<input className="mt-1 w-full rounded-xl border p-3 dark:border-slate-700 dark:bg-slate-900" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required /></label><label className="block text-sm font-medium">Password<input className="mt-1 w-full rounded-xl border p-3 dark:border-slate-700 dark:bg-slate-900" type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required /></label><button className="btn-primary w-full" disabled={status === 'loading'}>{status === 'loading' ? 'Signing in...' : 'Login'}</button><p className="text-center text-sm text-slate-500">New merchant? <Link className="font-semibold text-brand-600" to="/register">Create an account</Link></p></form></main>;
}
