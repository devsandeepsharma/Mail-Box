import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';

import Button from "../components/ui/Button";

import "./form.css";

const Login = () => {

    const [toggle, setToggle] = useState(false);

    const handleToggle = () => {
        setToggle(prev => !prev);
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
                        console.log(values)
                        actions.setSubmitting(false);
                    }}
                >
                    <Form className="form">
                        <div className="form__input-box">
                            <label className="input-box__label">Email</label>
                            <Field className="input-box__input" name="email" type="email" placeholder="user@gmail.com" />
                            <p className="input-box__error"><ErrorMessage name="email" /></p>
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
                            <p className="input-box__error"><ErrorMessage name="password" /></p>
                        </div>
                        <Button className="form__link forgot-pass" varient="link" to="/forgot-password" isLink={true}>Forgot Password?</Button>
                        <Button className="form__btn" type="submit">Login</Button>
                    </Form>
                </Formik>
                <p className="form__link">Create new acccount? <Button varient="link" to="/signup" isLink={true}>Signup</Button></p>
            </div>
        </div>
    )
}

export default Login;