import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { AuthService } from "../../services/Authentication";
import { authActions } from "../../store/authSlice";

const AuthLayout = ({ children }) => {

    const dispatch = useDispatch();

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
        });

        return () => unsubscribe();
    }, [])

    return children
}

export default AuthLayout;