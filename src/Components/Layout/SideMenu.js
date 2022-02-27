import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import logo from '../../assets/image/gp_400px.png'
import { Link } from "react-router-dom";
import { authContext } from '../../Providers/AuthProvider';


export default class SideMenu extends Component {
    static contextType = authContext;

    constructor(props) {
        super(props);
        this.state = { width: 0, height: 0 };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        this.menuInitialState(window.innerWidth)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    smallScreen = (size) => {
        return size < 768;
    }

    blackoutClick = () => {
        this.getElement().classList.remove("open-sm");
    }

    getElement = () => {
        return document.getElementById("root");
    }

    menuInitialState = (width) => {
        if (this.getElement().classList.contains("open-sm")) {
            this.getElement().classList.remove("open-sm");
        } 
        if(!this.smallScreen(width)) {
            if (this.isCollapsed()) {
                this.getElement().classList.add("collapsed");
            }
            else {
                this.getElement().classList.remove("collapsed");
                this.unsetCollapsed();
            }
        }
    }

    changeToggle = () => {
        if (this.smallScreen(this.state.width)) {
            this.getElement().classList.toggle("open-sm");
        }
        else {
            if (this.isCollapsed()) {
                this.getElement().classList.remove("collapsed");
                this.unsetCollapsed()
            }
            else {
                this.getElement().classList.add("collapsed");
                this.setCollapsed();
            }
        }
    }

    setCollapsed() {
        window.localStorage.setItem('collapsed', "collapsed");
    }

    unsetCollapsed() {
        window.localStorage.setItem('collapsed', "");
    }

    isCollapsed() {
        return window.localStorage.getItem('collapsed') === "collapsed";
    }

    doLogout = (e) => {
        e.preventDefault();
        this.context.Logout()
    }

    render() {
        return (
            <>
                <div className='blackout' onClick={this.blackoutClick}></div>
                <div className='sidemenu'>
                    <div className='sidemenu__title'>
                        <Link to="/" className='brand'>
                            <img src={logo} alt='GoldPocket' />
                        </Link>
                        <button type='button' className='toggle' onClick={this.changeToggle}>
                            <span className='toggle__box'>
                                <span className='toggle__box__inner'></span>
                            </span>
                        </button>
                    </div>
                    <ul className='sidemenu__menu'>
                        <li className='sidemenu__menu--title'>Menu</li>
                        <li>
                            <NavLink to="/Dashboard" onClick={this.blackoutClick}>
                                <i className='menu-icon fas fa-chart-line'></i>
                                Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/Expenses" onClick={this.blackoutClick}>
                                <i className="menu-icon fas fa-file-invoice"></i>
                                Expenses
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/Locations" onClick={this.blackoutClick}>
                                <i className="menu-icon fas fa-building"></i>
                                Locations
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/Items" onClick={this.blackoutClick}>
                                <i className="menu-icon fas fa-cubes"></i>
                                Items
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/Categories" onClick={this.blackoutClick}>
                                <i className="menu-icon fas fa-layer-group"></i>
                                Categories
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/Savings" onClick={this.blackoutClick}>
                                <i className="menu-icon fas fa-cash-register"></i>
                                Savings
                            </NavLink>
                        </li>
                        <li className="menu-division"></li>
                        {/* <li>
                            <NavLink to="Profile">
                                username
                                <i className="menu-icon fas fa-user-circle"></i>
                            </NavLink>
                        </li> */}
                        <li>
                            <a href='/' onClick={this.doLogout}>
                                Logout
                                <i className="menu-icon fas fa-sign-out-alt"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </>
        )
    }
}