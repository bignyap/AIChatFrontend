import './App.css';
import {  
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route 
} from 'react-router-dom';

import Navbar from './components/Navbar';
import Error from './components/Error'

import ContactPage from './pages/Contact';
import UtilityPage from './pages/Utility';
import ChatPage from './pages/Chat/Chat';
import NotFound from './pages/NotFound';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Navbar />}>
    <Route 
      path ="chat" 
      element={<ChatPage />} 
      errorElement={<Error />}
    />
    <Route 
      path="contact" 
      element={<ContactPage />} 
    />
    <Route
      path="utility"
      element={<UtilityPage />}
      errorElement={<Error />}
    />
    <Route path="*" element={<NotFound />} />
  </Route>
))

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}
