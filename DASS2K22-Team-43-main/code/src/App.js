import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import LandingPage from './components/pages/LandingPage'
import LoginPage from './components/pages/LoginPage'
import RegisterPage from './components/pages/RegisterPage'
import ForgetPasswordPage from './components/pages/ForgetPasswordPage'
import HomePage from './components/pages/HomePage'
import WeaverProfile from './components/pages/WeaverProfile'
import SpinnerProfile from './components/pages/SpinnerProfile'
import DyerProfile from './components/pages/DyerProfile'
import SpinnerEditProfile from './components/pages/SpinnerEditProfile'
import WeaverEditProfile from './components/pages/WeaverEditProfile'
import DyerEditProfile from './components/pages/DyerEditProfile'
import Navbar from './components/Navbar'
import WeaverDashboard from './components/pages/WeaverDashboard'
import DyerDashboard from './components/pages/DyerDashboard'
import SpinnerDashboard from './components/pages/SpinnerDashboard'
import HelpPage from './components/pages/HelpPage'
import DisplayProductDetails from './components/pages/DisplayProductDetails'
import FabricDetails from './components/pages/FabricDetails'

import './App.css'

export default function App() {
    return (
        <Router>
            <Navbar></Navbar>
            <div>
                <Switch>
                    <Route exact path="/" component={ LandingPage } />
                    <Route path="/login" component={ LoginPage } />
                    <Route path="/weaver_profile" component={ WeaverProfile } />
                    <Route path="/spinner_profile" component={ SpinnerProfile } />
                    <Route path="/dyer_profile" component={ DyerProfile } />
                    <Route path="/weaver_dashboard" component={WeaverDashboard} />
                    <Route path="/spinner_dashboard" component={SpinnerDashboard} />
                    <Route path="/dyer_dashboard" component={DyerDashboard} />
                    <Route path="/register" component={ RegisterPage } />
                    <Route path="/forget-password" component={ ForgetPasswordPage } />
                    <Route path="/home" component={ HomePage } />
                    <Route path="/spinner_edit_profile" component={ SpinnerEditProfile } />
                    <Route path="/dyer_edit_profile" component={ DyerEditProfile } />
                    <Route path="/weaver_edit_profile" component={ WeaverEditProfile } />
                    <Route path="/help" component={ HelpPage } />
                    <Route path="/display_product_details" component={DisplayProductDetails} />
                    <Route path="/fabric_details" component={FabricDetails} />

                </Switch>
              
            </div>
        </Router>
    )
}

const FooterStyle = {
    background: "#222",
    fontSize: ".8rem",
    color: "#fff",
    position: "absolute",
    bottom: 0,
    padding: "1rem",
    margin: 0,
    width: "100%",
    opacity: ".5"
}