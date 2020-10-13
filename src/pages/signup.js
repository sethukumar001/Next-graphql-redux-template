import React, { Component } from 'react';
import { registerUser } from "../lib/auth";


class signup extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            username: "",
            email: "",
            password: "",
            loading: false
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state)
    }

    render() {
        return (
            <div>
                Username:<input type="text" value={this.state.username} onChange={(e) => { this.setState({ username: e.target.value }) }}></input><br></br>
                    Email:<input type="email" value={this.state.email} onChange={(e) => { this.setState({ email: e.target.value }) }}></input><br></br>
                    Password:<input type="password" value={this.state.password} onChange={(e) => { this.setState({ password: e.target.value }) }}></input><br></br>
                <button onClick={() => {
                    this.setState({ loading: true });
                    registerUser(this.state.username, this.state.email, this.state.password)
                        .then((res) => {
                            // set authed user in global context object
                            console.log(res)
                            this.setState({ loading: false });
                        })
                        .catch((error) => {
                            // setError(error.response.data);
                            this.setState({ loading: false });
                        });
                }}>Signup</button><br></br>
            </div>
        );
    }
}

export default signup;