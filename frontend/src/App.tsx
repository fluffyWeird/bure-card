import { Route, Routes, useNavigate } from "react-router";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./Pages/Home";
import Login from "./Pages/Login";

import Callback from "./Pages/callback";
import DocLogin from "./Pages/DocLogin";
import DocSignup from "./Pages/DocSignup";
import { useAuth } from "../src/lib/AuthContext";
import axios from "axios";



function App() {
  const { user } = useAuth();
  const navigate = useNavigate();

  console.log("Current user:", user);

  const handleLogout = async() => {
     const response = await axios.get("http://localhost:5000/api/staff/logout", {
  withCredentials: true,
});
    if (response.status === 200) {
 
      navigate("/login");
    } else {
      console.error("Logout failed");
    }
  };

  

  return (
    <Routes>
      <Route path={"/login"} element={<Login />} />
      <Route path={"/doc-signup"} element={<DocSignup />} />
      <Route path={"/doc-login"} element={<DocLogin />} />
      <Route
        path={"/"}
        element={
             <ProtectedRoute>
          <Home
            currentRole={user ? user?.userRole : "patient"}
           
            userName={user ? user?.userName : ""}
            onLogout={handleLogout}
          /></ProtectedRoute>
        }
      />
      <Route path={"/callback"} element={<Callback />} />
    </Routes>
  );
}

export default App;
