
import { Route, Routes } from "react-router"
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
import Home from './Pages/Home'
import Login from './Pages/Login'
function App() {
  return (
  <Routes>
    

    <Route path={'/login' } element={<Login/>}/>
    <Route element={<AuthOutlet fallbackPath='/login' />}>
      <Route path={'/'} element={<Home/>}/>
    </Route>
  </Routes>
  )
}

export default App