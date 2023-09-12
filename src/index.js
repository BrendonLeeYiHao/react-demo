import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom';
import ListUser from './Components/ListUser';
import Login from './Components/Login';
import GuestLayout from './Components/Guest/GuestLayout';
import Home from './Components/Guest/Home';
import CreateUser from './Components/CreateUser';
import AdminLayout from './Components/Admin/AdminLayout';
import Message from './Message';
import Dashboard from './Components/Admin/Dashboard';
import { AuthProvider } from './AuthContext';

// import { isAuthenticated } from './Components/Login';
// import { AuthProvider } from './AuthContext';

// const isAuthenticated = false;

// function ProtectRoute(element){
//   const navigate = useNavigate();

//   if(!isAuthenticated){
//     navigate('/login');
//     return null;
//   }
//   return element;
// }

const router = createBrowserRouter([
  {
    path: '',
    element: <GuestLayout/>,
    children: [
      {path: '', element: <Home/>},
      {path: 'register', element: <CreateUser/>},
      {path: 'account-update-delete', element: <ListUser/>},
      {path: 'login', element: <Login/>},
      {path: 'message', element: <Message/>}
    ]
  },
  {
    path: 'admin',
    element: <AdminLayout/>,
    children: [
      {path: '', element: <Dashboard/>},
      {path: 'message', element: <Message/>}
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </AuthProvider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
