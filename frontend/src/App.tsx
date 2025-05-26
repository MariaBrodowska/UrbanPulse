import './App.css'
import { Route, Routes } from "react-router-dom"
import DisplayRegisterPage from './user/register/Register'
import DisplayLoginPage from './user/login/Login'
<<<<<<< Updated upstream
import TokenProvider from './user/login/Token'
import CheckToken from './user/CheckToken'
=======
import DisplayDatasetsPage from './data/datasets/Datasets'
>>>>>>> Stashed changes
function App() {
  return (
    <TokenProvider>
      <Routes>
        <Route path="/checktoken" element={<CheckToken />} />
        <Route path="/login" element={<DisplayLoginPage />} />
        <Route path="/register" element={<DisplayRegisterPage />} />
        <Route path="/datasets" element={<DisplayDatasetsPage />}  />
      </Routes>
    </TokenProvider>
  )
}
export default App
