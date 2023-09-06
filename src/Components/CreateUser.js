import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

export default function CreateUser(){
    
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:80/reactjs/api/createuser.php', inputs).then(function(response){
            console.log(response.data);
            navigate('/');
        });
        console.log(inputs);
    }
    
    
    return(
        <div>
            <h1>Create Users</h1>
            <form onSubmit={handleSubmit}>
                <label>Name: </label>
                <input type="text" name="name" onChange={handleChange}/>
                <br/><br/>
                <label>Email: </label>
                <input type="text" name="email" onChange={handleChange}/>
                <br/><br/>
                <label>Mobile: </label>
                <input type="text" name="mobile" onChange={handleChange}/>
                <br/><br/>
                <button>Save</button>
            </form>
        </div>
    )
}