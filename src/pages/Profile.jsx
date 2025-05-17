import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

import "./pages.css";
import "./form.css";
import "./profile.css";
import Button from "../components/ui/Button";

import { AuthService } from "../services/Authentication";
import { authActions } from "../store/authSlice";
import { getFirebaseAuthErrorMessage } from "../utils/getFirebaseAuthErrorMessage";

const Profile = () => {

    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [toggle, setToggle] = useState(false);
    const [error, setError] = useState();

    const handleToggle = () => {
        setToggle(prev => !prev);
    }

    const ProfileSchema = Yup.object({
        username: Yup.string()
            .min(2, "Username must be at least 2 characters")
            .max(12, "Username can't be longer than 12 characters")
            .required("Username is required"),
        photoUrl: Yup.string()
            .required("Photo URL is required")
    });

    const updateUserProfile = async (values, actions) => {
        setError("");

        if(values.username === user.username && user.photoUrl === values.photoUrl) {
            setError("Please add new values.")
            actions.setSubmitting(false);
            return;
        }

        const userData = {
            uid: user.uid,
            username: values.username,
            email: user.email,
            photoUrl: values.photoUrl
        }

        try {
            await AuthService.updateUserProfile(values.username, values.photoUrl);
            dispatch(authActions.updateUser(userData));
            handleToggle();
        } catch (error) {
            const msg = getFirebaseAuthErrorMessage(error);
            setError(msg);
        } finally {
            actions.setSubmitting(false);
        }
    }

    const logoutUser = async () => {
        try {
            await AuthService.logout();
            dispatch(authActions.logout());
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <main className="profile__container">
            <div className="profile">
                <div className="profile__header">
                    <h1 className="profile__title">My Profile</h1>
                    <Button variant="outline" onClick={handleToggle}>
                        {toggle ? "Back" : "Edit"}
                    </Button>
                </div>
                {
                    toggle ? (
                        <Formik
                            initialValues={{
                                username: user?.username,
                                photoUrl: user?.photoUrl
                            }}
                            validationSchema={ProfileSchema}
                            onSubmit={(values, actions) => {
                                updateUserProfile(values, actions);
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form className="form">
                                    <div className="form__input-box">
                                        <label className="input-box__label">Username</label>
                                        <Field className="input-box__input" name="username" type="text" />
                                        <p className="input-box__error">
                                            <ErrorMessage name="username" />
                                            {error && error}
                                        </p>
                                    </div>
                                    <div className="form__input-box">
                                        <label className="input-box__label">Photo URL</label>
                                        <Field className="input-box__input" name="photoUrl" type="text" />
                                        <p className="input-box__error">
                                            <ErrorMessage name="photoUrl" />
                                            {error && error}
                                        </p>
                                    </div>
                                    <Button type="submit" className="form__btn" disabled={isSubmitting}>
                                        {isSubmitting ? "Updating...": "Update Profile"}
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    ) : (
                        <>
                            <div className="profile__details">
                                <img className="profile__img" src={user?.photoUrl} alt="profile photo" />
                                <div>
                                    <h2>{user?.username}</h2>
                                    <p>{user?.email}</p>
                                    <Button onClick={logoutUser}>Logout</Button>
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        </main>
    )
}

export default Profile;