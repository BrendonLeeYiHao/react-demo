import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { Button, Form, FormControl, InputGroup, Row } from "react-bootstrap";
import { event } from "jquery";

export default function CreateUser(){
    
    // const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        name: '',
        password: '',
        email: '',
        mobile: '',
        dob: new Date()
    });

    //disabled all dates before today and 30 days after
    const today = new Date();
    const advancedDates = new Date();
    today.setDate(today.getDate() - 1);
    advancedDates.setDate(advancedDates.getDate() + 29); 

    //at least 18 years old
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 18);

    const isDateDisabled = (date) => {
        // return date < today || date > advancedDates;
        return date >= maxDate;
        
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const handleDateChange = (date) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + 1);
        const isoDateString = newDate.toISOString().split('T')[0];
        console.log(isoDateString);
        setInputs((values) => ({...values, dob: isoDateString}));
    }

    const [selectedFile, setSelectedFile] = useState(undefined);

    const [imageUrl, setImageUrl] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if(file){
            const reader = new FileReader();

            reader.onload = () => {
                setSelectedFile(file);
                setImageUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
        else{
            setImageUrl('');
        }

        
    }

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if(form.checkValidity() === false){
            event.preventDefault();
            event.stopPropagation();
        }
        else{
            event.preventDefault();
            const newDate = new Date(inputs.dob);
            inputs.dob = newDate.toISOString().split('T')[0];

            const formData = new FormData();
            formData.append('name', inputs.name);
            formData.append('password', inputs.password);
            formData.append('email', inputs.email);
            formData.append('mobile', inputs.mobile);
            formData.append('dob', inputs.dob)
            formData.append('file', selectedFile);
            axios.post('http://localhost:8000/api/register', formData).then(function(response){
                console.log(response.data);
                Swal.fire('Success', response.data, 'success');
                setInputs({
                    name: '',
                    password: '',
                    email: '',
                    mobile: '',
                    dob: new Date()
                });
                setSelectedFile(undefined);
                setImageUrl('');
            });
        }
        setValidated(true);
    }
    
    
    return(
        <div style={{margin:'auto', maxWidth: '800px'}}>
            <h1>Create Users</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit} encType="multipart/form-data">
                <Form.Group className="mb-3" controlId="formGroupName">
                    <Form.Label>Name</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control name="name" required value={inputs.name} onChange={handleChange} ></Form.Control>
                        <Form.Control.Feedback type="invalid">Name is required</Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control name="password" type="password" value={inputs.password} required onChange={handleChange} ></Form.Control>
                        <Form.Control.Feedback type="invalid">Password is required</Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Email</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control type="email" name="email" value={inputs.email} required onChange={handleChange} ></Form.Control>
                        <Form.Control.Feedback type="invalid">Invalid email</Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupMobile">
                    <Form.Label>Mobile</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control name="mobile" value={inputs.mobile} required onChange={handleChange}></Form.Control>
                        <Form.Control.Feedback type="invalid">Mobile is required</Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupDob">
                    <Form.Label>Dob</Form.Label>
                    <InputGroup hasValidation>
                        <DatePicker clearIcon={null} format="yyyy-MM-dd" onChange={handleDateChange} value={inputs.dob} maxDate={maxDate} tileDisabled={({date}) => isDateDisabled(date)}/>
                    </InputGroup>  
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupFile">
                    <Form.Label>File</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control name="file" type="file" required onChange={handleFileChange}></Form.Control>
                        <Form.Control.Feedback type="invalid">File is required</Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>

                {imageUrl && (
                    <div>
                        <img src={imageUrl} width={200} height={120} />
                    </div>
                )}
                <Button type="primary">Create</Button>
            </Form>
        </div>
    )
}