import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {
  BrowserRouter
} from "react-router";
import { Toaster } from "sonner"

import createStore from 'react-auth-kit/createStore'
import { AuthProvider } from "../src/lib/AuthContext.tsx";
interface IUserData {
 name: string;
 uuid: string;
};

const store = createStore<IUserData>({
 authName:'_auth',
 authType:'cookie',
 cookieDomain: window.location.hostname,
 cookieSecure: window.location.protocol === 'https:'
})
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
   <AuthProvider >
     <Toaster />
     <BrowserRouter>
        
       <App />
     </BrowserRouter>
   </AuthProvider>
  </StrictMode>,
)
