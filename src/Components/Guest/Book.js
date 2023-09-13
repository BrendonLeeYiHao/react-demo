import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { useEffect } from "react";

export function Book(){
    
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

    return(
        <>
            <h1>Booking Page</h1>
            <span>Contents .......</span>
        </>
    )
}