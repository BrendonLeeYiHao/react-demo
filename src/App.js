import logo from './logo.svg';
import './App.css';
import Message from './Message';
import ListGroup from './ListGroup';
import PassFunction from './PassFunction';

//
import { BrowserRouter, Routes, Route, Link, createBrowserRouter, Outlet } from 'react-router-dom';
import CreateUser from './Components/CreateUser';
import ListUser from './Components/ListUser';
import EditUser from './Components/EditUser';
import TopNavigationBar from './TopNavigationBar';

function App() {
//   <Routes>
//   <Route index element={<ListUser/>}/>
//   <Route path="user/create" element={<CreateUser/>}/>
//   <Route path="message" element={<Message/>} />
//   <Route path="login" element={<Login/>}/>
// </Routes>

  return (
    <Outlet/>
    // <TopNavigationBar/>
  );
}

export default App;
