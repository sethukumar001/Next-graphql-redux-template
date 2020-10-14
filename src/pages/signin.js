import React, { Component } from 'react';
import { login } from "../lib/auth";


class signin extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
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
                Email:<input type="email" value={this.state.email} onChange={(e) => { this.setState({ email: e.target.value }) }}></input><br></br>
                    Password:<input type="password" value={this.state.password} onChange={(e) => { this.setState({ password: e.target.value }) }}></input><br></br>
                <button onClick={() => {
                    this.setState({ loading: true });
                    login(this.state.email, this.state.password)
                        .then((res) => {
                            this.setState({ loading: false });
                            console.log(res)
                        })
                        .catch((error) => {
                            // setError(error.response.data);
                            this.setState({ loading: false });
                        });
                }}>Signin</button><br></br>
            </div>
        );
    }
}

export default signin;