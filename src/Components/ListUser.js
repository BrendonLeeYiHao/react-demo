import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import {Table} from "react-bootstrap";
import * as yup from 'yup';
import * as formik from 'formik';
import Swal from "sweetalert2";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";


export default function ListUser(){

    // const { Formik } = formik;

    // const schema = yup.object().shape({
    //     id: yup.string(),
    //     name: yup.string().required('Name is required'),
    //     email: yup.string().email('Invalid Email').required('Email is required'),
    //     mobile: yup.string().required()
    // });

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [users, setUsers] = useState([]);

    const [singleUser, setSingleUser] = useState({
        id:'',
        name:'',
        email:'',
        mobile:'',
        date: new Date()
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

    useEffect(() => {
        getUsers();
    }, []);

    function getUsers(){
        axios.get('http://localhost:8000/api/getAllUsers').then(function(response){
            console.log(response.data);
            setUsers(response.data);
        })
    }


    const editProfile = (id) => {   
        axios.post('http://localhost:8000/api/getUser', {id}).then(function(response){
            console.log(response.data);
            setSingleUser(response.data);
        })
        handleShow();
    }


    const deleteProfile = (id, file) => {
        axios.post('http://localhost:8000/api/deleteUser', {id}).then(function(response){
            console.log(response.data);
            getUsers();
            Swal.fire("Success", response.data, "success");
        
            axios.post('http://localhost:8000/api/deleteImage', {file}).then(function(response){
                console.log(response.data);
            });
        });
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setSingleUser(values => ({...values, [name]: value}));
    }

    const handleDateChange = (date) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + 1);
        const isoDateString = newDate.toISOString().split('T')[0];
        console.log(isoDateString);
        // const formattedDate = date.toISOString().split('T')[0];
        setSingleUser((values) => ({...values, dob: isoDateString}));
    }

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {

        const form = event.currentTarget;
        console.log(form.checkValidity());
        if(form.checkValidity() === false){
            event.preventDefault();
            event.stopPropagation();
        }
        else{
            event.preventDefault();
            const userId = singleUser.id;
            console.log(singleUser);
            axios.post(`http://localhost:8000/api/updateUser?id=${userId}`, singleUser).then(function(response){
                console.log(response.data);
                Swal.fire("Success",response.data,"success");
                getUsers();
                handleClose();
            });
        }
        setValidated(true);

    }

    return (
        <div style={{maxWidth: '1000px', margin: 'auto'}}>
            <h1>List Users</h1>
            <Table striped bordered hover variant="light" >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Dob</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, key) => (
                        <tr key={key}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.role}</td>
                            <td>{user.email}</td>
                            <td>{user.mobile}</td>
                            <td>{user.dob}</td>
                            <td><img width={200} height={120} src={require(`../assets/image/${user.file}`)}/></td>
                                {/* {user.file ? (
                                    <img width={200} height={120} src={require(`../assets/image/${user.file}`)}/>
                                ) : (
                                    <span>None</span>
                                )}
                            </td> */}

                            <td>
                                <Button variant="primary" onClick={() => editProfile(user.id)}>Edit</Button>&nbsp;&nbsp;
                                <Button variant="danger" onClick={() => deleteProfile(user.id, user.file)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal box */}
            
            <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{marginBottom:'-15px'}}>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formGroupId">
                                <Form.Label>Id</Form.Label>
                                <Form.Control name="id" value={singleUser.id} readOnly></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupName">
                                <Form.Label>Name</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control name="name" required value={singleUser.name} onChange={handleChange} ></Form.Control>
                                    <Form.Control.Feedback type="invalid">Name is required</Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label>Email</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control type="email" name="email" required value={singleUser.email} onChange={handleChange} ></Form.Control>
                                    <Form.Control.Feedback type="invalid">Invalid email</Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupMobile">
                                <Form.Label>Mobile</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control name="mobile" required value={singleUser.mobile} onChange={handleChange}></Form.Control>
                                    <Form.Control.Feedback type="invalid">Mobile is required</Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupDob">
                                <Form.Label>Dob</Form.Label>
                                <InputGroup hasValidation>
                                    <DatePicker clearIcon={null} format="yyyy-MM-dd" onChange={handleDateChange} value={singleUser.dob} maxDate={maxDate} tileDisabled={({date}) => isDateDisabled(date)}/>
                                </InputGroup>  
                            </Form.Group>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button type="submit" variant="primary">
                                Save Changes
                            </Button>
                            </Modal.Footer>
                        </Form>
                    </Modal.Body>
                    
                </Modal>
            </>
        </div>
        
    )
}