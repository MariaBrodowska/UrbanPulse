import './App.css'
import { Route, Routes } from "react-router-dom"
import DisplayRegisterPage from './user/register/Register'
import DisplayLoginPage from './user/login/Login'
import DisplayDatasetsPage from './data/datasets/Datasets'
import DataCharts from './data/charts/Charts'
function App() {
  return (
    <Routes>
      <Route path="/login" element={<DisplayLoginPage />} />
      <Route path="/register" element={<DisplayRegisterPage />} />
      <Route path="/datasets" element={<DisplayDatasetsPage />} />
      <Route path="/charts" element={<DataCharts />} />
    </Routes>
  )
}
export default App
