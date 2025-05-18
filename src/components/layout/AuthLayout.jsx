import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";

import Loading from "../ui/Loading";

import { AuthService } from "../../services/Authentication";
import { EmailService } from "../../services/Email";
import { authActions } from "../../store/authSlice";
import { emailActions } from "../../store/emailSlice";

const AuthLayout = ({ children }) => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    const unsubscribeEmailsRef = useRef(null);

    useEffect(() => {
        const unsubscribeAuth = AuthService.onAuthStateChanged(async (user) => {
            if(user) {
                const userData = {
                    uid: user.uid,
                    username: user.displayName,
                    email: user.email,
                    photoUrl: user.photoURL
                }

                dispatch(authActions.login(userData));

                try {
                    const sentEmails = await EmailService.getSentEmails();
                    dispatch(emailActions.setSentEmails(sentEmails));
                    console.log("Sent Emails :", sentEmails);
                } catch (err) {
                    console.error("Failed to fetch sent emails", err);
                }

                if (unsubscribeEmailsRef.current) {
                    unsubscribeEmailsRef.current();
                }

                unsubscribeEmailsRef.current = EmailService.listenToReceivedEmails((emails) => {
                    dispatch(emailActions.setReceivedEmails(emails));
                    console.log("Received Emails for", user.email, ":", emails);
                });

            } else {
                dispatch(authActions.logout());

                if (unsubscribeEmailsRef.current) {
                    unsubscribeEmailsRef.current();
                    unsubscribeEmailsRef.current = null;
                }
            }

            setLoading(false);
        });

        return () => {
            unsubscribeAuth();

            if (unsubscribeEmailsRef.current) {
                unsubscribeEmailsRef.current();
                unsubscribeEmailsRef.current = null;
            }
        }
    }, [dispatch]);

    if (loading) return <Loading />;

    return children;
}

export default AuthLayout;