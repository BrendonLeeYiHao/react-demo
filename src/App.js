import logo from './logo.svg';
import './App.css';
import Message from './Message';
import ListGroup from './ListGroup';
import PassFunction from './PassFunction';

//
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CreateUser from './Components/CreateUser';
import ListUser from './Components/ListUser';
import EditUser from './Components/EditUser';

function App() {
  return (
    <div style={{textAlign:'center'}}>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

      {/* <h1>Hello this is my first react app.</h1>
      <h2>It's my first time learning react</h2>
      <ListGroup/>
      <PassFunction msg="Message here hehehehhe">
        <h2>React is a library not a <u>Framework</u></h2>
        <span><b>Testing 12345</b></span>
      </PassFunction> */}

      <h5>React CRUD operations using PHP API & MySQL</h5>

      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">List Users</Link>
            </li>
            <li>
              <Link to="user/create">Create User</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route index element={<ListUser/>} />
          <Route path="user/create" element={<CreateUser />}/>
          <Route path="user/:id/edit" element={<EditUser />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
