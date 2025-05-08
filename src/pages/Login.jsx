import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';

import Button from "../components/ui/Button";

import "./form.css";

const Login = () => {
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
                            <Field className="input-box__input" name="email" type="email" />
                            <ErrorMessage className="input-box__error" name="email" />
                        </div>
                        <div className="form__input-box">
                            <label className="input-box__label">Password</label>
                            <Field className="input-box__input" name="password" type="password" />
                            <ErrorMessage className="input-box__error" name="password" />
                        </div>
                        <Button className="form__btn">Login</Button>
                    </Form>
                </Formik>
                <p className="form__link">Create new acccount? <Button varient="link" to="/signup" type="link">Signup</Button></p>
            </div>
        </div>
    )
}

export default Login;