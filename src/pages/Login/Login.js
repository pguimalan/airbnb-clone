import React, {Component} from 'react';
import './Login.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import openModalAction from '../../actions/openModalAction';
import SignUp from './SignUp';
import axios from 'axios';
import loginAction from '../../actions/loginAction';
import swal from 'sweetalert';

class Login extends Component{

    state = {
        email: "",
        password: ""
    };

    changeEmail =(e) => this.setState({email: e.target.value});
    changePassword =(e) => this.setState({password: e.target.value});

    submitLogin = async(e) => {
        e.preventDefault();
        const loginUrl = `${window.apiHost}/users/login`;
        
        const data = {
            email: this.state.email,
            password: this.state.password            
        };
        const response = await axios.post(loginUrl, data);
        if(response.data.msg === "badPass" || response.data.msg === "noEmail" ){
            swal({
                title: "Access Denied",
                text: "Invalid username or password.",
                icon: "error",
                dangerMode: true
            });
        } else if(response.data.msg === "loggedIn"){
            swal({
                title: "Success!",                
                icon: "success"
            });
            // we call our registration action to update our auth reducer!!!
            this.props.loginAction(response.data);
        }   
    }

    render(){
        return(
            <div className="login-form">
                <form onSubmit={this.submitLogin}>
                    <button className="facebook-login">Connect With Facebook</button>
                    <button className="google-login">Connect With Google</button>
                    <div className="login-or center">
                        <span>or</span>
                        <div className="or-divider"></div>
                    </div>
                    <input type="text" className="browser-default" placeholder="Email address" onChange={this.changeEmail} />
                    <input type="password" className="browser-default" placeholder="Password" onChange={this.changePassword} />
                    <button className="sign-up-button">Login</button>
                    <div className="divider"></div>
                    <div>Don't have an account? <span className="pointer" onClick={()=>{this.props.openModal('open', <SignUp />)}}>
                        Sign up</span></div>
                </form>
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
        loginAction: loginAction
    }, dispatcher)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);