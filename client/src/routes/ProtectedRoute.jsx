import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute({ isLoggedIn, userRole, allowedRole }) {
  if (!isLoggedIn) {
    return <Navigate to={`/login/${allowedRole}`} replace />;
  }
  if (userRole !== allowedRole) {
    // If a student tries to access mentor routes, redirect to student dashboard, etc.
    return <Navigate to={`/${userRole}/dashboard`} replace />;
  }
  return <Outlet />;
}
