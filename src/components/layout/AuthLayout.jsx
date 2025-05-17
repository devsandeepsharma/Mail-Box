import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import Loading from "../ui/Loading";

import { AuthService } from "../../services/Authentication";
import { authActions } from "../../store/authSlice";

const AuthLayout = ({ children }) => {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = AuthService.onAuthStateChanged((user) => {
            if(user) {
                const userData = {
                    uid: user.uid,
                    username: user.displayName,
                    email: user.email,
                    photoUrl: user.photoURL
                }
    
                dispatch(authActions.login(userData));
            } else {
                dispatch(authActions.logout());
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, [])

    if (loading) return <Loading />;

    return children
}

export default AuthLayout;