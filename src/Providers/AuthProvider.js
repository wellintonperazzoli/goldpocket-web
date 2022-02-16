import React, { Component } from "react";
import Loading from "../Components/Layout/Loading";
import { getToken, getTokenInvalidRequest, removeToken, setToken, setTokenInvalidRequest } from "../Services/TokenService";
import { isEmpty } from "../Utils/Utils"

export const authContext = React.createContext();

export default class AuthProvider extends Component {
    constructor(props) {
        super(props)
        var token = getToken();
        this.state = {
            token: token,
            isAuthenticated: false,
            loading: true
        }
    }

    componentDidMount() {
        var token = getToken();
        this.setState({
            token: token,
            isAuthenticated: !isEmpty(token),
            loading: false,
            Logout: this.Logout,
            Login: this.Login
        })

        this.validateToken();
    }

    validateToken = () => {
        setInterval(() => {
            if(getTokenInvalidRequest() === "connection_refused"){
                this.props.alertContext.newAlert("alert-danger", "Server offline, trying again")
            } 
            else if(getTokenInvalidRequest() === "invalid_token") {
                this.props.alertContext.newAlert("alert-danger", "Session expired, please login again")
                setTokenInvalidRequest();
                removeToken();
                this.setState({
                    token: null,
                })
            }
        }, 10000);
    }

    Logout = () => {
        this.props.modalContext.showModal((
            <span>Are you sure you want to logout?</span>
        ), this.doLogout)
    }

    doLogout = () => {
        removeToken();
        this.setState({
            token: false,
        })
    }

    Login = (token) => {
        setToken(token)        
        this.setState({
            token: getToken(),
        })
    }

    render() {

        if (this.state.loading)
            return (<Loading />)

        else
            return (
                <authContext.Provider value={this.state}>
                    {this.props.children}
                </authContext.Provider>
            );
    }
}