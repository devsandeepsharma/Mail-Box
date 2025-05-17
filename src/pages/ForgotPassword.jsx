import { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

import "./pages.css";
import "./form.css";
import Button from "../components/ui/Button";

import { AuthService } from "../services/Authentication";
import { getFirebaseAuthErrorMessage } from "../utils/getFirebaseAuthErrorMessage";

const ForgotPassword = () => {

    const [error, setError] = useState();
    const [success, setSuccess] = useState();

    const ForgotPasswordSchema = Yup.object({
        email: Yup.string()
            .email("Please enter a valid email address")
            .required("Email is required")
    })

    const sendResetLink = async (values, actions) => {
        setError("");
        try {
            await AuthService.forgotPassword(values.email);
            setSuccess("Check your inbox for the reset link!");
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
                <h1 className="form__title">Forgot Your Password?</h1>
                <p className="form__desc">Enter your email address below, and we’ll send you a link to reset your password.</p>
                <Formik
                    initialValues={{
                        email: ""
                    }}
                    validationSchema={ForgotPasswordSchema}
                    onSubmit={(values, actions) => {
                        sendResetLink(values, actions);
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
                                {success && <p className="form__success">{success}</p>}
                            </div>
                            <Button type="submit" className="form__btn" disabled={isSubmitting}>
                                {isSubmitting ? "Sending...": "Sent Reset Link"}
                            </Button>
                        </Form>
                    )}
                </Formik>
                <p className="form__link">Try login again? <Button variant="link" to="/login" isLink>Login</Button></p>
            </div>
        </main>
    )
}

export default ForgotPassword;