import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';

import Button from "../components/ui/Button";
import { AuthService } from "../services/Authentication";
import { getFirebaseAuthErrorMessage } from "../utils/firebaseErrorUtils";
import { authActions } from "../store/authSlice";

import "./form.css";

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [toggle, setToggle] = useState(false);
    const [error, setError] = useState();
    
    const handleToggle = () => {
        setToggle(prev => !prev);
    }

    const loginUser = async (values, actions) => {
        setError("");
        try {
            const user = await AuthService.login(values.email, values.password);
            
            const userData = {
                uid: user.user.uid,            
                username: user.user.displayName, 
                email: user.user.email,       
                photoUrl: user.user.photoURL
            }

            dispatch(authActions.login(userData));
            navigate("/");
        } catch (error) {
            const msg = getFirebaseAuthErrorMessage(error);
            setError(msg);
        } finally {
            actions.setSubmitting(false);;
        }
    }

    return (
        <div className="form-container">
            <div className="form__card">
                <h1 className="form__title">Welcome Back 👋</h1>
                <Formik
                    initialValues={{
                        email: "",
                        password: ""
                    }}

                    validationSchema={Yup.object({
                        email: Yup.string()
                            .email("Please enter a valid email address")
                            .required("Email is required"),
                    
                        password: Yup.string()
                            .min(6, "Password must be at least 6 characters")
                            .max(12, "Password can't be longer than 12 characters")
                            .required("Password is required"),
                    })}

                    onSubmit={(values, actions) => {
                        loginUser(values, actions);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className="form">
                            <div className="form__input-box">
                                <label className="input-box__label">Email</label>
                                <Field className="input-box__input" name="email" type="email" placeholder="user@gmail.com" />
                                <p className="input-box__error">
                                    <ErrorMessage name="email" />
                                    {error && !error.toLowerCase().includes('email') && !error.toLowerCase().includes('password') && (
                                        <span>{error}</span>
                                    )}
                                    {error && error.toLowerCase().includes('email') && (
                                        <span>{error}</span>
                                    )}
                                </p>
                            </div>
                            <div className="form__input-box">
                                <label className="input-box__label">Password</label>
                                <div className="form__input-box-inner">
                                    <Field 
                                        className="input-box__input" 
                                        name="password" 
                                        type={toggle ? "text": "password"} 
                                        placeholder="••••••••"
                                    />
                                    <Button 
                                        className="toggle-btn" 
                                        varient="ghost" 
                                        type="button" 
                                        onClick={handleToggle}
                                    >
                                        {toggle ? "Hide": "Show"}
                                    </Button>
                                </div>
                                <p className="input-box__error">
                                    <ErrorMessage name="password" />
                                    {error && !error.toLowerCase().includes('email') && !error.toLowerCase().includes('password') && (
                                        <span>{error}</span>
                                    )}
                                    {error && error.toLowerCase().includes('password') && (
                                        <span>{error}</span>
                                    )}
                                </p>
                            </div>
                            <Button className="form__link forgot-pass" varient="link" to="/forgot-password" isLink>Forgot Password?</Button>
                            <Button className="form__btn" type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Loging in..": "Login"}
                            </Button>
                        </Form>
                    )}
                </Formik>
                <p className="form__link">Create new acccount? <Button varient="link" to="/signup" isLink>Signup</Button></p>
            </div>
        </div>
    )
}

export default Login;