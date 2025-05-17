import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    sendPasswordResetEmail,
    onAuthStateChanged
} from "firebase/auth";

import { app } from "./config";

class Authentication {
    constructor() {
        this.auth = getAuth(app);
        this.user = null;
    }

    signup(email, password) {
        return createUserWithEmailAndPassword(this.auth, email, password);
    }

    login(email, password) {
        return signInWithEmailAndPassword(this.auth, email, password);
    }

    logout() {
        return signOut(this.auth);
    }

    updateUserProfile(fullName, photoURL) {
        return updateProfile(this.auth.currentUser, {displayName: fullName, photoURL: photoURL});
    }

    forgotPassword(email) {
        return sendPasswordResetEmail(this.auth, email);
    }

    onAuthStateChanged(callback) {
        return onAuthStateChanged(this.auth, (user) => {
            this.user = user || null;
            callback(this.user);
        });
    }
}

export const AuthService = new Authentication();