import { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { EditorState } from "draft-js";

import "./pages.css";
import "./composeEmail.css";
import EmailEditor from "../components/ui/EmailEditor";
import Button from "../components/ui/Button";

import { EmailService } from "../services/Email";

const ComposeEmail = () => {

    const [emailBody, setEmailBody] = useState();
    const [success, setSuccess] = useState();
    const [error, setError] = useState();
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

    const EmailSchema = Yup.object({
        receiverEmail: Yup.string()
            .email("Please enter a valid email address")
            .required("Email is required"),

        title: Yup.string()
            .min(6, "Title must be at least 6 characters")
            .max(20, "Title can't be longer than 12 characters")
            .required("Title is required"),
    })

    const sendEmail = async (values, actions) => {
        setError("");
        setSuccess("");
        if (!emailBody || emailBody.trim() === "" || emailBody === "<p></p>\n") {
            setError("Email body cannot be empty.");
            actions.setSubmitting(false);
            return;
        }

        try {
            const emailData = await EmailService.sendEmail(
                values.receiverEmail,
                values.title,
                emailBody
            );
            setSuccess("Mail Sent Successfully!");
            actions.resetForm();
            setEmailBody("");
            setEditorState(EditorState.createEmpty());
        } catch (error) {
            setError("Failed to send email. Please try again.");
        } finally {
            actions.setSubmitting(false);
        }
    }

    return (
        <main className="compose-email">
            <div className="compose-email__card">
                <h1 className="compose-email__title">Compose Email</h1>
                <Formik
                    initialValues={{
                        receiverEmail: "",
                        title: ""
                    }}
                    validationSchema={EmailSchema}
                    onSubmit={(values, actions) => {
                        sendEmail(values, actions);
                    }}
                >
                    {({isSubmitting }) => (
                        <Form className="compose-email__form">
                            <div className="form__inner">
                                <div className="form__input-box">
                                    <label className="input-box__label">Receiver Email</label>
                                    <Field className="input-box__input" name="receiverEmail" type="email" />
                                    <p className="input-box__error">
                                        <ErrorMessage name="receiverEmail" />
                                    </p>
                                </div>
                                <div className="form__input-box">
                                    <label className="input-box__label">Title</label>
                                    <Field className="input-box__input" name="title" type="text" />
                                    <p className="input-box__error">
                                        <ErrorMessage name="title" />
                                    </p>
                                </div>
                            </div>
                            <div className="form__input-box">
                                <label className="input-box__label">Email Body</label>
                                <EmailEditor 
                                    editorState={editorState}
                                    setEditorState={setEditorState}
                                    onChange={setEmailBody} 
                                />
                                <p className="input-box__error">
                                    {error && error}
                                </p>
                            </div>
                            {success && <p className="form__success">{success}</p>}
                            <Button className="form__btn" type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Sending.." : "Send Email"}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        </main>
    )
}

export default ComposeEmail;