import './App.css'
import { Route, Routes } from "react-router-dom"
import DisplayRegisterPage from './user/register/Register'
import DisplayLoginPage from './user/login/Login'
function App() {
  return (
      <Routes>
        <Route path="/login" element={<DisplayLoginPage />} />
        <Route path="/register" element={<DisplayRegisterPage />} />
      </Routes>
  )
}
export default App
