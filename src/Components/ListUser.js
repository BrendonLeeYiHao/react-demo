import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import {Table} from "react-bootstrap";
import * as yup from 'yup';
import * as formik from 'formik';

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
        mobile:''
    });

    useEffect(() => {
        getUsers();
    }, []);

    // function getUsers(){
    //     axios.get('http://localhost:80/reactjs/api/getAllUsers.php').then(function(response){
    //         console.log(response.data);
    //         setUsers(response.data);
    //     })
    // }

    function getUsers(){
        axios.get('http://localhost:8000/api/getAllUsers').then(function(response){
            console.log(response.data);
            setUsers(response.data);
        })
    }


    const editProfile = (id) => {
        // axios.post(`http://localhost:80/reactjs/api/getUser.php?id=${id}`, {id: id})

        // setIsModalOpen(true);
        
        axios.post('http://localhost:8000/api/getUser', {id}).then(function(response){
            console.log(response.data);
            setSingleUser(response.data);
        })
        handleShow();

        // axios.post('http://localhost:80/reactjs/api/getUser.php', {id: id}).then(function(response){
        //     console.log(response.data);
        //     setSingleUser(response.data);
        // })

    }


    const deleteProfile = (id) => {
        // axios.post('http://localhost:80/reactjs/api/deleteUser.php', {id: id}).then(function(response){
        //     console.log(response.data);
        //     getUsers();
        // })
        axios.post('http://localhost:8000/api/deleteUser', {id}).then(function(response){
            console.log(response.data);
            getUsers();
        })
    }

    // const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setSingleUser(values => ({...values, [name]: value}));
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
            // axios.post('http://localhost:80/reactjs/api/updateUser.php', {user: singleUser}).then(function(response){
            //     console.log(response.data);
            //     getUsers();
            //     handleClose();

            // });
            const userId = singleUser.id;
            axios.post(`http://localhost:8000/api/updateUser?id=${userId}`, singleUser).then(function(response){
                console.log(response.data);
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
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, key) => (
                        <tr key={key}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.mobile}</td>
                            <td>
                                <Button variant="primary" onClick={() => editProfile(user.id)}>Edit</Button>&nbsp;&nbsp;
                                <Button variant="danger" onClick={() => deleteProfile(user.id)}>Delete</Button>
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


                {/* <div className="modal fade" id="editModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body" style={{marginBottom:'-15px'}}>
                        <form onSubmit={handleSubmit}>
                            <label>Id: </label>
                            <input type="text" name="id" value={singleUser.id} readOnly/>
                            <br/><br/>
                            <label>Name: </label>
                            <input type="text" name="name" value={singleUser.name} onChange={handleChange}/>
                            <br/><br/>
                            <label>Email: </label>
                            <input type="text" name="email" value={singleUser.email} onChange={handleChange}/>
                            <br/><br/>
                            <label>Mobile: </label>
                            <input type="text" name="mobile" value={singleUser.mobile} onChange={handleChange}/>
                            <br/><br/>
                            
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        
                        </form>
                    </div>

                    </div>
                </div>
                </div> */}
            
            
        </div>
        
    )
}