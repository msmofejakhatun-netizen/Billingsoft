import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ProtectedRoute } from './components/ProtectedRoute.jsx';
import { fetchCurrentUser } from './features/auth/authSlice.js';
import { AdminLayout } from './layouts/AdminLayout.jsx';
import { Dashboard } from './pages/Dashboard.jsx';
import { Login } from './pages/Login.jsx';
import { Operations } from './pages/Operations.jsx';
import { Register } from './pages/Register.jsx';

function AdminHome() {
  return <AdminLayout><Dashboard /><div className="mt-6"><Operations /></div></AdminLayout>;
}

export default function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) dispatch(fetchCurrentUser());

    const handleUnauthorized = () => dispatch(fetchCurrentUser());
    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorized);
  }, [dispatch, token]);

  return <BrowserRouter><Routes><Route path="/login" element={<Login />} /><Route path="/register" element={<Register />} /><Route element={<ProtectedRoute roles={['super_admin', 'merchant']} />}><Route path="/" element={<AdminHome />} /></Route></Routes></BrowserRouter>;
}
