import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout from './pages/Layout'
import Login from './pages/users/Login'
import Register from './pages/users/Register'
import Dashboard from './pages/Dashboard'
import HomePage from './pages/admin/HomePage'

const App = () => {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<HomePage/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
}
export default App
