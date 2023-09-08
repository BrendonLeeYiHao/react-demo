import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { BrowserRouter, Link, Routes, Route, NavLink } from 'react-router-dom';
import CreateUser from './Components/CreateUser';

import ListUser from './Components/ListUser';

function TopNavigationBar() {
  return (
    <BrowserRouter>
        <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
            <Navbar.Brand>
                <NavLink to="/">React</NavLink>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link>
                    <NavLink to="/">List User</NavLink>
                </Nav.Link>
                <Nav.Link>
                    <NavLink to="/user/create">Create User</NavLink>
                </Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item>
                        <NavLink to="/user/create">Create User</NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                        Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                        Separated link
                    </NavDropdown.Item>
                </NavDropdown>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
        <Routes>
            <Route index element={<ListUser/>}/>
            <Route path="user/create" element={<CreateUser/>}/>
        </Routes>
    </BrowserRouter>
    
  );
}

export default TopNavigationBar;