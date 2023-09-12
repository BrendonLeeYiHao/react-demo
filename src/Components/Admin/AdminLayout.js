import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { useEffect } from "react";
import { Button } from "react-bootstrap";

export default function AdminLayout(){

    const {isLoggedIn, setIsLoggedIn} = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        checkAuthentication();
    }, []);

    function checkAuthentication(){
        console.log(isLoggedIn);
        if(!isLoggedIn){
            navigate('/login');
        }
    }

    const logout = () => {
        setIsLoggedIn(false);
        navigate('/login');
    }

    return(
        <>
            <div style={{height: '400px'}}>
                <h1>Admin Navigation Bar</h1>
                <NavLink to="/admin/message">Message</NavLink>
                <Button variant="danger" onClick={logout}>Logout</Button>
            </div>
            <div>
                <Outlet/>
            </div>
            <footer>
                @Copyright 2023 react admin - brendon
            </footer>
        </>
    )
}