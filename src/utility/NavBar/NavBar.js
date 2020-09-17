import React, { Component } from 'react'
import './NavBar.css';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import openModalAction from '../../actions/openModalAction';
import Login from '../../pages/Login/Login';
import SignUp from '../../pages/Login/SignUp';
import logoutAction from '../../actions/logoutAction';

class NavBar extends Component {

    componentDidUpdate(oldProps){
        if(oldProps.auth.token !== this.props.auth.token) {
            this.props.openModal('closed','');
        }
    }

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
                                {
                                    this.props.auth.email
                                    ?
                                    <>
                                        <li className="login-signup"><Link to="/account">Hello, {this.props.auth.email}</Link> </li>
                                        <li className="login-signup" onClick={() => this.props.logoutAction()}>Logout</li>
                                    </>
                                    : 
                                    <>
                                        <li className="login-signup" onClick={()=> {this.props.openModal('open', <SignUp />)}}>Sign up</li>
                                        <li className="login-signup" onClick={()=> {this.props.openModal('open', <Login />)}}>Login</li>
                                    </>

                                }                                
                            </ul>
                        </div>
                    </nav>                    
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        auth: state.auth
    }
}
function mapDispatchToProps(dispatcher){
    return bindActionCreators({
        openModal: openModalAction,
        logoutAction: logoutAction,
    }, dispatcher)
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
