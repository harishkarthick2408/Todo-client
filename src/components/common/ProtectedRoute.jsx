import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Loader from "./Loader";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <Loader message="Authenticating..." />;

  if (!user) return <Navigate to="/login" replace />;

  return children || <Outlet />;
};

export default ProtectedRoute;
