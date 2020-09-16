import React, { Component } from 'react'
import './NavBar.css';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import openModalAction from '../../actions/openModalAction';
import Login from '../../pages/Login/Login';
import SignUp from '../../pages/Login/SignUp';

class NavBar extends Component {
    render() {
        let navColor = 'transparent';
        if(this.props.location.pathname!=='/') {
            navColor='black';
        }

        return (
            <div className="container-fluid nav">
                <div className="row">
                    <nav className={navColor}>
                        <div className="nav-wrapper">
                            <NavLink to="/" className="left">airbnb</NavLink>
                            <ul id="nav-mobile" className="right">
                                <li><NavLink to="/">English (US)</NavLink></li>
                                <li><NavLink to="/">$ USD</NavLink></li>
                                <li><NavLink to="/">Become a Host</NavLink></li>
                                <li><NavLink to="/">Help</NavLink></li>
                                <li className="login-signup" onClick={()=> {this.props.openModal('open', <SignUp />)}}>Sign up</li>
                                <li className="login-signup" onClick={()=> {this.props.openModal('open', <Login />)}}>Login</li>
                            </ul>
                        </div>
                    </nav>                    
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatcher){
    return bindActionCreators({
        openModal: openModalAction
    }, dispatcher)
}

export default connect(null, mapDispatchToProps)(NavBar);
