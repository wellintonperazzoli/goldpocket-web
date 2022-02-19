import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import logo from '../../../assets/image/gp_400px.png'
import RequestUrl from '../../../Config/RequestUrl';
import { authContext } from '../../../Providers/AuthProvider';
import RequestService from '../../../Services/RequestService';
import BackButton from '../../Layout/BackButton';
import Loading from '../../Layout/Loading';

export default class Register extends Component {
    static contextType = authContext;

    constructor(props) {
        super(props);
        this.state = {
            Email: "",
            Password: "",
            Confirm: "",
            RememberMe: false,
            submitted: false,
            errors: [],
            attempts: 0,
            registered: false,
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event) => {
        console.log("Making registration")
        if(!this.state.submitted) {
            event.preventDefault();
        }

        if(this.state.Password !== this.state.Confirm) {
            this.setState({
                errors: ["Passwords must be the same!"],
                submitted: false
            })
            return;
        }

        let message = !this.state.submitted ?
            "Creating account..." :
            "Server unavailable, trying again...";
        this.setState({
            submitted: true,
            submittedMessage: message,
            attemps: this.state.attempts + 1,
        })
        RequestService.post(RequestUrl.Register, {
            Email: this.state.Email,
            Password: this.state.Password
        }, (response) => {
            this.context.Register(this.state.Email)
            this.setState({
                registered: true
            })
        }, (e) => {
            if(e.response.data[0] !== undefined)
            {
                this.setState({
                    errors: [e.response.data[0].description],
                    submitted: false
                })
            }
            else
            {
                this.setState({
                    errors: ["Unable to create account"],
                    submitted: false
                })
            }
        });
    }

    render() {
        if(this.state.registered)
            return <Navigate to="Login"></Navigate>

        return (
            <div className="row loginBox">
                <div className="col">
                    <h1 className="text-center loginTitle mb-4 width-100"><img className='width-100' src={logo} alt='GoldPocket' /></h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <h3 className='margin-center'>New Account</h3>
                            <div className="form__group">
                                <input type='email' name='Email' id='Email' value={this.state.Email} aria-required="true" onChange={this.handleInputChange} disabled={this.state.submitted} />
                                <label htmlFor='Email'>Email</label>
                                <span asp-validation-for="Email" className="text-danger"></span>
                            </div>
                            <div className="form__group">
                                <input type='password' name='Password' id='Password' value={this.state.Password} aria-required="true" onChange={this.handleInputChange} disabled={this.state.submitted} />
                                <label htmlFor='Password'>Password</label>
                            </div>
                            <div className="form__group">
                                <input type='password' name='Confirm' id='Confirm' value={this.state.Confirm} aria-required="true" onChange={this.handleInputChange} disabled={this.state.submitted} />
                                <label htmlFor='Confirm'>Confirm Password</label>
                            </div>
                        </div>
                        <div className="form-actions mt-2 text-center">
                            {
                                this.state.submitted ?
                                    <>
                                        <Loading className="margin-center mb-2" />
                                        <span className="info"> {this.state.submittedMessage}</span>
                                    </>
                                    :
                                    <button id="login-submit" type="submit" className="btn-success btn-lg width-100">Create Account!</button>
                            }

                        </div>
                        <div className='validation-summary-errors'>
                            <ul>
                                {
                                    this.state.errors.map((e) => (
                                        <li key={e.trim()}>{e}</li>
                                    ))
                                }

                            </ul>
                        </div>
                        {
                            !this.state.submitted ?
                                (
                                    <div className="row form-actions mt-0">
                                        <div className="col-xs-12 text-center">
                                            <BackButton>
                                                Back to login
                                            </BackButton>
                                        </div>
                                    </div>
                                ) : <></>

                        }
                    </form>
                </div>
            </div>
        )
    }
}