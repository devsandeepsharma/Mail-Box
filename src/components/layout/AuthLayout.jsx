import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { AuthService } from "../../services/Authentication";
import { authActions } from "../../store/authSlice";

const AuthLayout = ({children}) => {

    const dispatch = useDispatch();

    useEffect(() => {
        const checkUserState = async () => {
            try {
                const user = await AuthService.checkCurrentState();

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
            } catch (error) {
                console.error("Error checking authentication state:", error);
            }
        };
        checkUserState();
    }, [])

    return <>{ children }</>;
}

export default AuthLayout;