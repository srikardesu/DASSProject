// import WeaverNav from "../BuyerNav"
import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'
import './Profile.css'

// import UpdateProfile from "./UpdateProfile";

export default function SpinnerProfile() {
    const [UserData, SetUserData] = useState("");
    // let UserEmail = localStorage.getItem('emailID');

    const handleClick = () => {
        window.location.href = "/spinner_edit_profile";
    }

    useEffect(() => {
        console.log(localStorage.getItem("id"));
        axios
            .get('http://localhost:5000/spinner/' + localStorage.getItem("id"))
            .then(function (response) {       //response comes as an array of json
                // checking if the entry is there
                console.log("Data in backend profile" + response.data)
                SetUserData(response.data)
            })
            .catch(function (err) {
                console.log("Oh No! Error :(");
                console.log(err);
                // localStorage.setItem('UserType', '');
                // localStorage.setItem('emailID', '');
                // localStorage.setItem('ID','');
            })
    }, [])
    function getName() {
        return (UserData.name);
    }

    function getEmail() {
        return (UserData.email);
    }

    function getContact() {
        return (UserData.contact_no);
    }

    function getAddress() {
        return (UserData.address);
    }

    // function getAge()
    // {
    //     if(UserData.Age === "" || !UserData.Age)
    //         return("Age not updated")
    //     else
    //         return(UserData.Age);
    // }

    // function getBatch()
    // {
    //     if(UserData.Batch_Name === "" || !UserData.Batch_Name)
    //         return("Batch not updated")
    //     else
    //         return(UserData.Batch_Name);
    // }


    return (
        <div className='box-shadow'>
            {/* <WeaverNav /> */}
            <div id="welcome-message">
                Hello {getName()}!!
            </div>
            <br />
            <div id="details">
                Your profile details are as follows:
                <br />
                <br />
                Name: {getName()}
                <br />
                <br />
                Email: {getEmail()}
                <br />
                <br />
                Contact Number: {getContact()}
                <br />
                <br />
                Address: {getAddress()}
                <br />
            </div>
            <br />
            <div style={{ color: "green" }}>
                <button onClick={handleClick} value={handleClick} type='button'>Edit Profile</button>
            </div>
        </div>
    )
}


