import React, { useState } from 'react';
import Base from '../core/Base';
import { signup } from '../auth/Helper';
import { Link  } from "react-router-dom";
const Signup = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: false,
        success: false,
        errorMsgEmail: "",
        errorMsgName: "",
        errorMsgPass: ""
    })
    // eslint-disable-next-line
    const { name, email, password, error, success, errorMsgEmail, errorMsgName, errorMsgPass } = values

    const handleChange = (name) =>
        (event) => {
            setValues({ ...values, error: false, [name]: event.target.value });
        };
    const handleSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false })
        signup({ name, email, password })
            .then((data) => {
                console.log('DATA : ' + JSON.stringify(data));
                if (data.email === email) {
                    setValues({ ...values, success: true, error: false, name: "", email: "", password: "" })
                }
                else {
                    setValues({ ...values, error: true, success: false, errorMsgEmail: data.email,errorMsgName:data.name, errorMsgPass: data.password })
                }
            })
            .catch(e => { console.log('error : ' + e) }
            )
    }
    const successMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div
                        className="alert alert-success" style={{ display: success ? "" : "none" }}
                    >
                        New Account Created. Please <Link to="/signin">Login</Link>
                    </div>
                </div>
            </div>
        )
    }
    const ErrorMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div
                        className="alert alert-danger" style={{ display: error ? "" : "none" }}
                    >
                        <p>{errorMsgName ? <p>Name : {errorMsgName}</p> : ""}</p>
                        <p>{errorMsgEmail ? <p>Email : {errorMsgEmail}</p> : ""}</p>
                        <p>{errorMsgPass ? <p>Password : {errorMsgPass}</p> : ""}</p>
                    </div>
                </div>
            </div>
        )
    }
    const signUpForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input
                                value={name}
                                onChange={handleChange('name')}
                                className="form-control"
                                type="text"
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input
                                value={email}
                                onChange={handleChange('email')}
                                className="form-control"
                                type="text"
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input
                                value={password}
                                onChange={handleChange('password')}
                                className="form-control"
                                type="password"
                            />
                        </div>
                        <button
                            onClick={handleSubmit}
                            className="btn btn-success btn-block">Sign Up</button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <Base title="SignUp Page" description="Lets get Connected!!">
            {ErrorMessage()}
            {successMessage()}
            {signUpForm()}
            <p>{JSON.stringify(values)}</p>
        </Base>
    );
}

export default Signup;
