import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';

import Button from "../components/ui/Button";

import "./form.css";

const Signup = () => {

    const [toggle, setToggle] = useState(false);
    
    const handleToggle = () => {
        setToggle(prev => !prev);
    }

    return (
        <div className="form-container">
            <div className="form__card">
                <h1 className="form__title">Create New Account</h1>
                <Formik
                    initialValues={{
                        username: "",
                        email: "",
                        password: ""
                    }}

                    validationSchema={Yup.object({
                        username: Yup.string()
                        .min(2, "Username must be at least 2 characters")
                        .required("Username is required"),
                        
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
                            <label className="input-box__label">Username</label>
                            <Field className="input-box__input" name="username" type="text" placeholder="username" />
                            <p className="input-box__error"><ErrorMessage name="username" /></p>
                        </div>
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
                        <Button className="form__btn">Signup</Button>
                    </Form>
                </Formik>
                <p className="form__link">Already have an account? <Button varient="link" to="/login" isLink={true}>Login</Button></p>
            </div>
        </div>
    )
}

export default Signup;