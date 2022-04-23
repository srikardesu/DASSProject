import React from 'react'
import { useState } from "react";
import { Link } from 'react-router-dom'
import axios from "axios";
// import { useNavigate } from "react-router-dom";

import '../../App.css'

// const [email, setEmail] = useState("");
// const [password, setPassword] = useState("");

// const onChangeEmail = (event) => {
//     setEmail(event.target.value);
// };

// const onChangePassword = (event) => {
//     setPassword(event.target.value);
// };

// const navigate = useNavigate();

const onSubmit = (event) => {
    event.preventDefault();

    const password = document.getElementById("password").value

    const newUser = {
        email: document.getElementById("email").value,
        password: window.btoa({ password }.password)
    };
    // navigate("./Vendor")

    // alert(newUser.email);

    axios
        .post("http://localhost:5000/login/", newUser)
        .then((response) => {
            //alert("Found vendor\t" + response.data.manager_name);
            alert("succesfull!!!");
            // localStorage.setItem("id", response.data._id);
            // localStorage.setItem("type", flag);
            // navigate("/Vendor");
            // navigate("/weaver_profile");
            localStorage.setItem("id", response.data._id);
            localStorage.setItem("isloggedin", "yes");

            axios
                .get("http://localhost:5000/weaver/" + localStorage.getItem("id"))
                .then((response) => {
                    //alert("Found vendor\t" + response.data.manager_name);
                    // alert("found!!!");
                    // localStorage.setItem("type", 0);
                    if (response.data._id === localStorage.getItem("id")) {
                        localStorage.setItem("type", "weaver");
                        window.location.replace('/weaver_profile');
                    }
                })
            // .catch((error) => {
            //     console.log(error);
            // });

            axios
                .get("http://localhost:5000/dyer/" + localStorage.getItem("id"))
                .then((response) => {
                    //         //alert("Found vendor\t" + response.data.manager_name);
                    //         alert("found!!!");
                    //         localStorage.setItem("type", 1);
                    if (response.data._id === localStorage.getItem("id")) {
                        localStorage.setItem("type", "dyer");
                        window.location.replace('/dyer_profile');
                    }
                })
            //     // .catch((error) => {
            //     //     console.log(error);
            //     // });

            axios
                .get("http://localhost:5000/spinner/" + localStorage.getItem("id"))
                .then((response) => {
                    //         //alert("Found vendor\t" + response.data.manager_name);
                    //         alert("found!!!");
                    //         localStorage.setItem("type", 2);
                    if (response.data._id === localStorage.getItem("id")) {
                        localStorage.setItem("type", "spinner");
                        window.location.replace('/spinner_profile');
                    }
                })
                //     // .catch((error) => {
                //     //     console.log(error);
                //     // });

                //     // console.log(localStorage.getItem("usertype"));
                //     if (localStorage.getItem("type") == 0) {
                //         window.location.replace('/weaver_profile');
                //     }
                //     else if(localStorage.getItem("type") == 1) {
                //         window.location.replace('/dyer_profile');
                //     }
                //     else if(localStorage.getItem("type") == 2){
                //         window.location.replace('/spinner_profile');
                //     }
                //     //console.log(response.data);
                // })
                .catch((err) => {
                    alert(err.response.data.error);
                });

        })
        .catch((err) => {
            alert(err.response.data.error);
        });
    // resetInputs();
};


export default function SignInPage() {
    return (
        <div className="text-center m-5-auto">
            <h2>Malkha Inventory Management Portal <br></br> Sign In</h2>
            <form action="/home">
                <p>
                    <label>Email address</label><br />
                    <input type="text" id="email" name="first_name" required />
                </p>
                <p>
                    <label>Password</label>
                    {/* <Link to="/forget-password"><label className="right-label">Forgot password?</label></Link> */}
                    <br />
                    <input type="password" id="password" name="password" required />
                </p>
                <p>
                    <button id="sub_btn" type="submit" onClick={onSubmit}>Login</button>
                </p>
            </form>
            <footer>
                {/* <p>First time? <Link to="/register">Create an account</Link>.</p> */}
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )
}
