import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function ProtectedRoute({ roles }) {
  const location = useLocation();
  const { token, user, status } = useSelector((state) => state.auth);

  if (status === 'refreshing' || (token && !user)) return <div className="flex min-h-screen items-center justify-center">Restoring session...</div>;
  if (!token) return <Navigate to="/login" replace state={{ from: location }} />;
  if (roles?.length && !roles.includes(user.role)) return <Navigate to="/" replace />;

  return <Outlet />;
}
