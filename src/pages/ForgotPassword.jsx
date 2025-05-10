import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';

import Button from "../components/ui/Button";

import "./form.css";

const ForgotPassword = () => {
    return (
        <div className="form-container">
            <div className="form__card">
                <h1 className="form__title">Forgot Your Password?</h1>
                <p className="form__desc">Enter your email address below, and we’ll send you a link to reset your password.</p>
                <Formik
                    initialValues={{
                        email: ""
                    }}

                    validationSchema={Yup.object({
                        email: Yup.string()
                            .email("Please enter a valid email address")
                            .required("Email is required")
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
                        <Button className="form__btn">Sent Reset Link</Button>
                    </Form>
                </Formik>
                <p className="form__link">Try login again? <Button varient="link" to="/login" isLink={true}>Login</Button></p>
            </div>
        </div>
    )
}

export default ForgotPassword;