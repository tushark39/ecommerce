import React,{ useState } from 'react';
import Base from '../core/Base'
// eslint-disable-next-line
import { Link  ,Redirect} from "react-router-dom";
import { sigin,authenticate,isAuthenticated } from '../auth/Helper';
const Signin = () => {
    const [values, setValues] = useState({
        name: "",
        email: "one@gmail.com",
        password: "12345",
        error: false,
        success: false,
        loading:false,
        didRedirect:false,
        errorMsg:""
    })
    // eslint-disable-next-line
    const { name, email, password, error, success, errorMsg,loading,didRedirect } = values

    const handleChange = (name) =>
        (event) => {
            setValues({ ...values, error: false, [name]: event.target.value });
        };

    const successMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div
                        className="alert alert-success" style={{ display: success ? "" : "none" }}
                    >
                        Sign in Success..Please Wait...
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
                        <p>{errorMsg ? <p>{errorMsg}</p> : ""}</p>
                    </div>
                </div>
            </div>
        )
    }
    const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values,error:false,loading:true})
        sigin({email,password})
        .then(data=>{
            console.log('Data : '+ JSON.stringify(data));
            if(data.token){
                // let sessionToken = data.token
                authenticate(data,()=>{
                    console.log('Token Added');
                    setValues({...values,success:true})
                    
                })
            }
            else{
                setValues({
                    ...values,
                    error:true,
                    errorMsg:data.error,
                })
            }
            
        })
        .catch(e=>console.log('Error : '+e)
        )
    }
    const performRedirect = () => {
        if(isAuthenticated()){
            return <Redirect to="/" />
        }
    }
    const signUpForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
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
                            onClick={onSubmit}
                            className="btn btn-success btn-block">Sign In</button>
                    </form>
                </div>
            </div>
        )
    }
    return (
        <Base title="SignIn Page" description="Welcome Back">
            {successMessage()}
            {ErrorMessage()}
            {signUpForm()}
            {performRedirect()}
        </Base>
    );
}

export default Signin;
