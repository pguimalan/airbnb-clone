import React from 'react';

const SignUpInputFields = (props) => {
    return (
        <div className="sign-up-wrapper">
            <div className="col m12">
                <div className="input-field" id="email">
                    <div className="form-label">Email</div>
                    <input placeholder="Email" type="text" onChange={props.changeEmail} />
                </div>
            </div>

            <div className="col m12">
                <div className="input-field" id="password">
                <div className="form-label">Password</div>
                    <input placeholder="Password" type="password" onChange={props.changePassword} />
                </div>
            </div>

            <div className="col m12">                
                <button type="submit" className="btn red accent-2">Sign Up!</button>
            </div>
        </div>
    )
}

export default SignUpInputFields;