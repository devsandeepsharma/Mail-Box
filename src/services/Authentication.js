import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    updateProfile,
    sendPasswordResetEmail
} from "firebase/auth";

import { app } from "./config";

class Authentication {
    constructor() {
        this.auth = getAuth(app);
    }

    signup(email, password) {
        return createUserWithEmailAndPassword(this.auth, email, password);
    }

    login(email, password) {
        return signInWithEmailAndPassword(this.auth, email, password);
    }

    updateUserProfile(fullName, photoURL) {
        return updateProfile(this.auth.currentUser, {displayName: fullName, photoURL: photoURL});
    }

    forgotPassword(email) {
        return sendPasswordResetEmail(this.auth, email);
    }
}

export const AuthService = new Authentication();