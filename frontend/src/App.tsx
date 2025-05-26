import './App.css'
import { Route, Routes } from "react-router-dom"
import DisplayRegisterPage from './user/register/Register'
import DisplayLoginPage from './user/login/Login'
import TokenProvider from './user/login/Token'
import CheckToken from './user/CheckToken'
function App() {
  return (
    <TokenProvider>
      <Routes>
        <Route path="/checktoken" element={<CheckToken />} />
        <Route path="/login" element={<DisplayLoginPage />} />
        <Route path="/register" element={<DisplayRegisterPage />} />
      </Routes>
    </TokenProvider>
  )
}
export default App
