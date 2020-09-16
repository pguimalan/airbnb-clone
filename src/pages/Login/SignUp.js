import React, {Component} from 'react';
import './Login.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import openModalAction from '../../actions/openModalAction';
import regAction from '../../actions/registrationAction';
import Login from './Login';
import SignUpInputFields from './SignUpInputFields';
import axios from 'axios';
import swal from 'sweetalert';

class SignUp extends Component{
    constructor() {
        super();

        this.state = {
            lowerPartOfForm: <button type="button" onClick={this.showInputs} className="sign-up-button">Sign up with email</button>            
        };
    }

    changeEmail =(e) => this.setState({email: e.target.value});
    changePassword =(e) => this.setState({password: e.target.value});
 
    showInputs = () => {
        this.setState({
            lowerPartOfForm: 
                <SignUpInputFields 
                    changeEmail={this.changeEmail} 
                    changePassword={this.changePassword} />
        });
    }

    submitLogin = async(e) => {
        e.preventDefault();
        const url = `${window.apiHost}/users/signup`;
        const data = {
            email: this.state.email,
            password: this.state.password            
        };
        const resp = await axios.post(url, data);
        
        if(resp.data.msg === "userExists"){
            swal({
                title: "Email Exists",
                text: "The email you provided is already registered. Please try another.",
                icon: "error",
                dangerMode: true
            });
        } else if(resp.data.msg === "invalidData"){
            swal({
                title: "Invalid Email or Password",
                text: "Please provide email or password.",
                icon: "error",
                dangerMode: true
            });
        } else if(resp.data.msg === "userAdded"){
            swal({
                title: "Success!",                
                icon: "success"
            });
            // we call our registration action to update our auth reducer!!!
            this.props.regAction(resp.data);
        }
    }

    render(){

        console.log(this.props.auth);

        return(
            <div className="login-form">
                <form onSubmit={this.submitLogin}>
                    <button className="facebook-login">Connect With Facebook</button>
                    <button className="google-login">Connect With Google</button>
                    <div className="login-or center">
                        <span>or</span>
                        <div className="or-divider"></div>
                    </div>
                    {this.state.lowerPartOfForm}
                    <div className="divider"></div>
                    <div>Already have an account? <span className="pointer" onClick={()=>{this.props.openModal('open', <Login />)}}>
                        Log in</span></div>
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
        regAction: regAction
    }, dispatcher)
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

