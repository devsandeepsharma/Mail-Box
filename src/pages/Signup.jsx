import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';

import Button from "../components/ui/Button";

import "./form.css";

const Signup = () => {
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
                            <Field className="input-box__input" name="username" type="text" />
                            <ErrorMessage className="input-box__error" name="username" />
                        </div>
                        <div className="form__input-box">
                            <label className="input-box__label">Email</label>
                            <Field className="input-box__input" name="email" type="email" />
                            <ErrorMessage className="input-box__error" name="email" />
                        </div>
                        <div className="form__input-box">
                            <label className="input-box__label">Password</label>
                            <Field className="input-box__input" name="password" type="password" />
                            <ErrorMessage className="input-box__error" name="password" />
                        </div>
                        <Button className="form__btn">Signup</Button>
                    </Form>
                </Formik>
                <p className="form__link">Already have an account? <Button varient="link" to="/login" type="link">Login</Button></p>
            </div>
        </div>
    )
}

export default Signup;