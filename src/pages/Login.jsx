import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

import "./pages.css";
import "./form.css";
import Button from "../components/ui/Button";

import { AuthService } from "../services/Authentication";
import { getFirebaseAuthErrorMessage } from "../utils/getFirebaseAuthErrorMessage";
import { authActions } from "../store/authSlice";

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [toggle, setToggle] = useState(false);
    const [error, setError] = useState(false);
    
    const handleToggle = () => {
        setToggle(prev => !prev);
    }

    const LoginSchema = Yup.object({
        email: Yup.string()
            .email("Please enter a valid email address")
            .required("Email is required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .max(12, "Password can't be longer than 12 characters")
            .required("Password is required"),
    });

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
         <main className="form-container">
            <div className="form__card">
                <h1 className="form__title">Welcome Back 👋</h1>
                <Formik
                    initialValues={{
                        email: "",
                        password: ""
                    }}
                    validationSchema={LoginSchema}
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
                                    {error && error}
                                </p>
                            </div>
                            <Button className="form__link forgot-pass" variant="link" to="/forgot-password" isLink>Forgot Password?</Button>
                            <Button className="form__btn" type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Loging in..": "Login"}
                            </Button>
                        </Form>
                    )}
                </Formik>
                <p className="form__link">Create new acccount? <Button variant="link" to="/signup" isLink>Signup</Button></p>
            </div>
        </main>
    )
}

export default Login;