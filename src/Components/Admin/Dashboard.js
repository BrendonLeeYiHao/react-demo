import { useEffect } from "react";
import { useAuth } from "../../AuthContext"
import { useNavigate } from "react-router-dom";

export default function Dashboard(){

    // const {authUser, setAuthUser, isLoggedIn, setIsLoggedIn} = useAuth();

    // const {isLoggedIn, setIsLoggedIn} = useAuth();

    // const navigate = useNavigate();

    // useEffect(() => {
    //     checkAuthentication();
    // }, []);

    // function checkAuthentication(){
    //     console.log(isLoggedIn);
    //     if(!isLoggedIn){
    //         navigate('/');
    //     }
    // }

    return(
        <>
            <h1>Admin Dashboard</h1>
            <span>Contents here</span>
        </>
    )
}