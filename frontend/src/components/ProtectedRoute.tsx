import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import axios from "axios";
import { useAuth } from "../lib/AuthContext";

interface ProtectedRouteProps {
  children: any;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/staff/me", { withCredentials: true })
      .then((res) => {
        setUser(res.data.user); // assume API returns { user: {...} }
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, [setUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
