import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function EditUser(){

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    function getUsers(){
        axios.get('http://localhost:80/reactjs/api/getAllUsers.php').then(function(response){
            console.log(response.data);
            setUsers(response.data);
        })
    }



    return (
        <div>
            <h1>Edit User</h1>
            <table>
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
                                <Link to={'user/${user.id}/edit'}>Edit</Link>
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
    )
}