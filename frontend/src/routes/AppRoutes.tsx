import Dashboard from '../pages/Dashboard';
import { Route, Routes } from 'react-router';
import TodoDetails from '../pages/TodoDetails';

function AppRoutes() {
  return (
    <Routes>
    <Route path='/' element={<Dashboard/>}/>
    <Route path='/todo/:id' element={<TodoDetails/>}/>
  </Routes>
  )
}

export default AppRoutes