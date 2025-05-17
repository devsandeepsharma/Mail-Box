import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

import "./pages.css";
import "./form.css";
import Button from "../components/ui/Button";

import { AuthService } from "../services/Authentication";
import { getFirebaseAuthErrorMessage } from "../utils/getFirebaseAuthErrorMessage";

const Signup = () => {

    const defaultImg = "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D";

    const navigate = useNavigate();

    const [toggle, setToggle] = useState(false);
    const [error, setError] = useState(false);
    
    const handleToggle = () => {
        setToggle(prev => !prev);
    }

    const SignupSchema = Yup.object({
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
    });

    const createUser = async (values, actions) => {
        setError("");
        try {
            await AuthService.signup(values.email, values.password);
            await AuthService.updateUserProfile(values.username, defaultImg);
            navigate("/login");
        } catch (error) {
            const msg = getFirebaseAuthErrorMessage(error);
            setError(msg);
        } finally {
            actions.setSubmitting(false);;
        }
    }

    return (
        <main className="form-container">
            <div className="form__card">
                <h1 className="form__title">Create New Account</h1>
                <Formik
                    initialValues={{
                        username: "",
                        email: "",
                        password: ""
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={(values, actions) => {
                        createUser(values, actions);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className="form">
                            <div className="form__input-box">
                                <label className="input-box__label">Username</label>
                                <Field className="input-box__input" name="username" type="text" placeholder="username" />
                                <p className="input-box__error">
                                    <ErrorMessage name="username" />
                                    {error && !error.toLowerCase().includes("email") && <span>{error}</span>}
                                </p>
                            </div>
                            <div className="form__input-box">
                                <label className="input-box__label">Email</label>
                                <Field className="input-box__input" name="email" type="email" placeholder="user@gmail.com" />
                                <p className="input-box__error">
                                    <ErrorMessage name="email" />
                                    {error && error}
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
                                        variant="ghost" 
                                        type="button" 
                                        onClick={handleToggle}
                                    >
                                        {toggle ? "Hide": "Show"}
                                    </Button>
                                </div>
                                <p className="input-box__error">
                                    <ErrorMessage name="password" />
                                    {error && !error.toLowerCase().includes("email") && <span>{error}</span>}
                                </p>
                            </div>
                            <Button type="submit" className="form__btn" disabled={isSubmitting}>
                                {isSubmitting ? "Signing in..": "Signup"}
                            </Button>
                        </ Form>
                    )}
                </Formik>
                <p className="form__link">Already have an account? <Button variant="link" to="/login" isLink>Login</Button></p>
            </div>
        </main>
    )
}

export default Signup;