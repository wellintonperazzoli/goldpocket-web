import React, { Component } from 'react';
import logo from '../../../assets/image/gp_400px.png'
import RequestUrl from '../../../Config/RequestUrl';
import { authContext } from '../../../Providers/AuthProvider';
import RequestService from '../../../Services/RequestService';
import Loading from '../../Layout/Loading';

export default class Login extends Component {
    static contextType = authContext;

    constructor(props) {
        super(props);
        this.state = {
            Email: "",
            Password: "",
            RememberMe: false,
            makeLogin: false,
            errors: [],
            attempts: 0,
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
        if(!this.state.makeLogin) {
            event.preventDefault();
        }
        
        let message = !this.state.makeLogin ?
            "Trying to login..." :
            "Server unavailable, trying again...";
        this.setState({
            makeLogin: true,
            makeLoginMessage: message,
            attemps: this.state.attempts + 1,
        })
        RequestService.post(RequestUrl.Token, {
            Email: this.state.Email,
            Password: this.state.Password
        }, (response) => {
            this.context.Login(response.data)
        }, (e) => {
            if (!e.response) {
                setTimeout(() => {
                    this.handleSubmit(event)
                }, 3000);
            }
            else {
                this.setState({
                    errors: ["Invalid login"],
                    makeLogin: false
                })
            }
        });
    }

    render() {
        return (
            <div className="row loginBox">
                <div className="col">
                    <h1 className="text-center loginTitle mb-4 width-100"><img className='width-100' src={logo} alt='GoldPocket' /></h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="form__group">
                                <input type='text' name='Email' id='Email' value={this.state.Email} aria-required="true" onChange={this.handleInputChange} disabled={this.state.makeLogin} />
                                <label htmlFor='Email'>Email</label>
                                <span asp-validation-for="Email" className="text-danger"></span>
                            </div>
                            <div className="form__group">
                                <input type='password' name='Password' id='Password' value={this.state.Password} aria-required="true" onChange={this.handleInputChange} disabled={this.state.makeLogin}/>
                                <label htmlFor='Password'>Password</label>
                            </div>
                        </div>
                        {/* <div className="row form-actions">
                            <div className="col-xs-6">
                                <input type='checkbox' className='rememberMe' name="RememberMe" id='RememberMe' value={this.state.RememberMe} onChange={this.handleInputChange} />
                                <label htmlFor="RememberMe" className="form-label ml-4">
                                    Remeber me?
                                </label>
                            </div>
                            <div className="col-xs-6 text-right">
                                <a href='Register'>Create new account</a>
                            </div>
                        </div> */}
                        <div className="form-actions mt-2 text-center">
                            {
                                this.state.makeLogin ?
                                    <>
                                        <Loading className="margin-center mb-2"/>
                                        <span className="info"> {this.state.makeLoginMessage}</span>                                         
                                    </> 
                                    :
                                    <button id="login-submit" type="submit" className="btn-success btn-lg width-100">Log in!</button>
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
                    </form>
                </div>
            </div>
        )
    }
}