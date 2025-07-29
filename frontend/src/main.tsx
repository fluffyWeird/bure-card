import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {
  BrowserRouter
} from "react-router";

import AuthProvider from 'react-auth-kit';
import createAuthStore from 'react-auth-kit/store/createAuthStore';

const store = createAuthStore('cookie', {
  authName: 'auth',
  cookieDomain: 'localhost',
  cookieSecure: false,
  cookiePath: '/',
  cookieSameSite: 'none',
  debug: true,
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <AuthProvider store={store}>
     <BrowserRouter>
       <App />
     </BrowserRouter>
   </AuthProvider>
  </StrictMode>,
)
