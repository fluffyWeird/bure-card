import { use, useEffect, useState } from "react";
import { Navigate } from "react-router";
import axios from "axios";
import { useAuth } from "../lib/AuthContext";

interface ProtectedRouteProps {
  children: any;
  currentRole: UserRole;
}

type UserRole = "patient" | "doc";
const ProtectedRoute = ({ children , currentRole }: ProtectedRouteProps) => {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const paths= {
    patient: "http://localhost:5000/api/me",
    doc: "http://localhost:5000/api/staff/me",
  }
console.log("Current user role:", currentRole);
  useEffect(() => {
    axios.get(paths[(user?.role as UserRole) || currentRole], { withCredentials: true })
      .then((res) => {

        console.log("User data fetched:", res.data);
        setUser(res.data);
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
