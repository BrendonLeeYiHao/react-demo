import axios from "axios";
import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { useAuth } from "../AuthContext";

export default function Login(){

    const navigate = useNavigate();

    const {isLoggedIn, setIsLoggedIn} = useAuth();

    const [inputs, setInputs] = useState({
        name: '',
        password: '',
    });

    const [validated, setValidated] = useState(false);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if(form.checkValidity() === false){
            event.preventDefault();
            event.stopPropagation();
        }
        else{
            event.preventDefault();
            axios.post('http://localhost:8000/api/login', inputs).then(function(response){
                console.log(response.data);

                if(response.data == "False"){
                    Swal.fire('Fail', 'Incorrect Login Credentials!', "error");
                }
                else{
                    if(response.data == "Admin"){
                        setIsLoggedIn(true);
                        navigate('/admin');
                    }
                    else{
                        setIsLoggedIn(true);
                        navigate('/');
                    }
                    // Swal.fire('Success', response.data, 'success');
                }
            });
        }
        setValidated(true);
    }


    return(
        <div style={{margin: 'auto', maxWidth: '800px'}}>
            <h1>Login Page</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formGroupName">
                    <Form.Label>Name</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control name="name" required  onChange={handleChange}></Form.Control>
                        <Form.Control.Feedback type="invalid">Name is required</Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control name="password" type="password" required  onChange={handleChange}></Form.Control>
                        <Form.Control.Feedback type="invalid">Password is required</Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Button type="primary">Login</Button>
            </Form>
        </div>
    )
}