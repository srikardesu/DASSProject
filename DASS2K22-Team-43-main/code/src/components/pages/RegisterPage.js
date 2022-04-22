import React, { Component } from 'react'
import axios from 'axios'

export default class CreateUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            password: '',
            address: '',
            contact_no: '',
            type: 'weaver'
        }
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onChangeAddress = this.onChangeAddress.bind(this)
        this.onChangePhone = this.onChangePhone.bind(this)
        this.onChangeType = this.onChangeType.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChangeUsername(event) {
        this.setState({ name: event.target.value })
    }
    onChangeEmail(event) {
        this.setState({ email: event.target.value })
    }
    onChangePassword(event) {
        this.setState({ password: event.target.value })
    }
    onChangeAddress(event) {
        this.setState({ address: event.target.value })
    }
    onChangePhone(event) {
        this.setState({ contact_no: event.target.value })
    }
    onChangeType(event) {
        let type_dd = document.getElementById("type_dd")
        this.setState({ type: type_dd.options[type_dd.selectedIndex].innerHTML })
    }

    onSubmit(e) {
        e.preventDefault()
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: window.btoa(this.state.password),
            address: this.state.address,
            contact_no: this.state.contact_no,
            type: this.state.type
        }
        axios.post('http://localhost:5000/register', newUser)
            .then(res => {
                if (res.status == 200) {
                    this.setState({
                        name: '',
                        email: '',
                        password: '',
                        address: '',
                        contact_no: '',
                        type: 'weaver'
                    })
                    document.getElementById("comments").innerHTML = "Success"
                    document.getElementById("comments").className = "alert alert-success alert-dismissible fade show"
                }
                else{
                    document.getElementById("comments").innerHTML = "Error"
                document.getElementById("comments").className = "alert alert-danger alert-dismissible fade show"
                                console.log(res.data)
                window.location.replace("/login")
                }
            })
            .catch(err=>{
                document.getElementById("comments").innerHTML = "Error"
                document.getElementById("comments").className = "alert alert-danger alert-dismissible fade show"
            })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text"
                            className="form-control"
                            required="true"
                            value={this.state.name}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password"
                            className="form-control"
                            required="true"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="email"
                            className="form-control"
                            required="true"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                        />
                    </div>
                    <div className="form-group">
                        <label>Address: </label>
                        <textarea
                            className="form-control"
                            required="true"
                            value={this.state.address}
                            onChange={this.onChangeAddress}
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone: </label>
                        <input type="text"
                            className="form-control"
                            required="true"
                            value={this.state.contact_no}
                            onChange={this.onChangePhone}
                        />
                    </div>
                    <div className="form-group">
                        <label>Type: </label>
                        <select
                            id='type_dd'
                            className="form-control"
                            value={this.state.type}
                            onChange={this.onChangeType}
                        >
                            <option value='weaver' selected>weaver</option>
                            <option value='spinner' >spinner</option>
                            <option value='dyer' >dyer</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                    <div id="comments">
                    </div>
                </form>
            </div>
        )
    }
}