
import { Route, Routes } from "react-router"
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
import Home from './Pages/Home'
import Login from './Pages/Login'
import { useState } from "react";
import Callback from "./Pages/callback";

function App() {
   const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentRole, setCurrentRole] = useState<string>("patient");

  const handleLogin = (role: string) => {
    setCurrentRole(role);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentRole("patient");
  };

  const handleRoleChange = (role: string) => {
    setCurrentRole(role);
  };

  return (
  <Routes>
    

    <Route path={'/login' } element={<Login/>}/>
    <Route element={<AuthOutlet fallbackPath='/login' />}><Route path={'/'} element={<Home  
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
        onLogout={handleLogout}
      />}/>
    </Route>

    <Route path={'/callback'} element={<Callback/>}/>
  </Routes>
  )
}

export default App