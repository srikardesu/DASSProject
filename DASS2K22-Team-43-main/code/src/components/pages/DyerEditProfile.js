import React, { useState, useEffect, Component } from 'react';
import axios from 'axios'

function DyerEditProfile() {
    const [UserData, SetUserData] = useState("");
    const [ID, setID] = useState("");
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [contact, setContact] = useState('')
    const [address, setAddress] = useState('')
    const [manager, setManager] = useState('')
    const [date, setDate] = useState('')

    useEffect(() => {
        let a = localStorage.getItem('id')
            setID(a)
           // console.log(a)
    }
    )

    const onChangeName = (event) =>  {
        setName(event.target.value)
    }
    const onChangeEmail = (event) =>  {
        setEmail(event.target.value)
    }
    const onChangeContact = (event) =>  {
        setContact(event.target.value)
    }   
    const onChangeAddress = (event) =>  {
        setAddress(event.target.value)
    }
    const onChangeManager = (event) =>  {
        setManager(event.target.value)
    }
    const onChangeDate = (event) =>  {
        setDate(event.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const newUser = {
            _id: ID,
            name: name,
            email: email,
            contact_no: contact,
            address: address,
            manager_name: manager,
            date_of_joining: date
        }
        axios.post('http://localhost:5000/dyer/editprofile', newUser)
            .then(res => {
                
                    document.getElementById("comments").innerHTML = "Success"
                    document.getElementById("comments").className = "alert alert-success alert-dismissible fade show"
                
            })
            .catch(err => {
                console.log(err)
                document.getElementById("comments").innerHTML = "Error"
                document.getElementById("comments").className = "alert alert-danger alert-dismissible fade show"
            })
    }

    return (
        
        <div>
            <form onSubmit={onSubmit}>
            <div className="form-group">
                    <label>Name: </label>
                    <input type="text"
                        required="true"
                        className="form-control"
                        value={name}
                        onChange={onChangeName}
                    />
                </div>
               
                <div className="form-group">
                    <label>Email: </label>
                    <input type="email"
                        className="form-control"
                        required="true"
                        value={email}
                        onChange={onChangeEmail}
                    />
                </div>
                <div className="form-group">
                    <label>Contact Number: </label>
                    <input type="text"
                        className="form-control"
                        required="true"
                        value={contact}
                        onChange={onChangeContact}
                    />
                </div>
                <div className="form-group">
                    <label>Address: </label>
                    <input type="text"
                        className="form-control"
                        required="true"
                        value={address}
                        onChange={onChangeAddress}
                    />
                </div>
                <div className="form-group">
                    <label>Manager Name: </label>
                    <input type="text"
                        className="form-control"
                        value={manager}
                        onChange={onChangeManager}
                    />
                </div>

                <div className="form-group">
                    <label>Date of Joining: </label>
                    <input type="date"
                        className="form-control"
                        value={date}
                        onChange={onChangeDate}
                    />
                </div>

                <div className="form-group">
                    <input type="submit" value="Update Profile" className="btn btn-primary" />
                </div>
                <div id="comments">
                </div>
            </form >
        </div >
);

}

export default DyerEditProfile;