import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {
  BrowserRouter
} from "react-router";
import { Toaster } from "sonner"
import {
 
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


import { AuthProvider } from "../src/lib/AuthContext.tsx";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
      <AuthProvider >
        <QueryClientProvider client={queryClient}>
          <Toaster />
          <BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} />
            <App />
          </BrowserRouter>
        </QueryClientProvider>
     </AuthProvider>
  </StrictMode>,
)
