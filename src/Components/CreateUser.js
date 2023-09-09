import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

export default function CreateUser(){
    
    // const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        name: '',
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

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);

        axios.post('http://localhost:8000/api/register', inputs).then(function(response){
            console.log(response.data);
            Swal.fire('Success', response.data, 'success');
        });
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
                <label>Dob: </label>
                <DatePicker clearIcon={null} format="yyyy-MM-dd" onChange={handleDateChange} value={inputs.dob} maxDate={maxDate} tileDisabled={({date}) => isDateDisabled(date)}/>
                <br/><br/>
                <button>Save</button>
            </form>
        </div>
    )
}