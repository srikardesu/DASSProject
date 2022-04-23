import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                {/* <Link to="/" className="navbar-brand">Dashboard</Link> */}
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        {/* {localStorage.getItem("isloggedin") == "yes" && <li className="navbar-item">
                            <Link to="/" className="nav-link">Food</Link>
                        </li>} */}
                        {localStorage.getItem("isloggedin") == "yes" && localStorage.getItem("type") == "spinner" && <li className="navbar-item">
                            <Link to="/spinner_profile" className="nav-link">Profile</Link>
                        </li>}
                        {localStorage.getItem("isloggedin") == "yes" && localStorage.getItem("type") == "weaver" && <li className="navbar-item">
                            <Link to="/weaver_profile" className="nav-link">Profile</Link>
                        </li>}
                        {localStorage.getItem("isloggedin") == "yes" && localStorage.getItem("type") == "dyer" && <li className="navbar-item">
                            <Link to="/dyer_profile" className="nav-link">Profile</Link>
                        </li>}
                        {localStorage.getItem("isloggedin") == "yes" && localStorage.getItem("type") == "weaver" && <li className="navbar-item">
                            <Link to="/weaver_dashboard" className="nav-link">Dashboard</Link>
                        </li>}
                        {localStorage.getItem("isloggedin") == "yes" && localStorage.getItem("type") == "dyer" && <li className="navbar-item">
                            <Link to="/dyer_dashboard" className="nav-link">Dashboard</Link>
                        </li>}
                        {localStorage.getItem("isloggedin") == "yes" && localStorage.getItem("type") == "spinner" && <li className="navbar-item">
                            <Link to="/spinner_dashboard" className="nav-link">Dashboard</Link>
                        </li>}
                        {localStorage.getItem("isloggedin") == "yes" && <li className="navbar-item">
                            <Link to="/" className="nav-link" onClick={() => { localStorage.clear() }}>Logout</Link>
                        </li>}
                        {localStorage.getItem("isloggedin") == "yes" && <li className="navbar-item">
                            <Link to="/help" className="nav-link" >Help</Link>
                        </li>}
                        {/* {localStorage.getItem("isloggedin") == "yes" && localStorage.getItem("type") == "Buyer" && <li className="navbar-item">
                            <Link to="/buyerdashboard" className="nav-link">Buyer Dashboard</Link>
                        </li>}
                        {localStorage.getItem("isloggedin") == "yes" && localStorage.getItem("type") == "Vendor" && <li className="navbar-item">
                            <Link to="/ordersdashboard" className="nav-link">Orders Dashboard</Link>
                        </li>}
                        {localStorage.getItem("isloggedin") == "yes" && localStorage.getItem("type") == "Vendor" && <li className="navbar-item">
                            <Link to="/statistics" className="nav-link">Statistics</Link>
                        </li>}
                        {localStorage.getItem("isloggedin") == "yes" && localStorage.getItem("type") == "Vendor" && <li className="navbar-item">
                            <Link to="/vendordashboard" className="nav-link">Vendor Dashboard</Link>
                        </li>}
                        {!(localStorage.getItem("isloggedin") == "yes") && <li className="navbar-item">
                            <Link to="/Login" className="nav-link">Login Page</Link>
                        </li>}
                        {(localStorage.getItem("isloggedin") == "yes") && <li className="navbar-item">
                            <Link to="/Login" className="nav-link">Logout</Link>
                        </li>}
                        {!(localStorage.getItem("isloggedin") == "yes") && <li className="navbar-item">
                            <Link to="/Register" className="nav-link">Registration Page</Link> */}
                        {/* </li>} */}
                    </ul>
                </div>
            </nav>
        );
    }
}
