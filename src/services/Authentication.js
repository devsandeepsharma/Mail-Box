import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    sendPasswordResetEmail,
    signOut,
    updateProfile
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

    forgotPassword(email) {
        return sendPasswordResetEmail(this.auth, email);
    }

    updateUserProfile(fullName, photoURL) {
        return updateProfile(this.auth.currentUser, {displayName: fullName, photoURL: photoURL});
    }

    checkCurrentState () {
        return new Promise((resolve) => {
            const unsubscribe = onAuthStateChanged(this.auth, (user) => {
                this.user = user || null;
                unsubscribe();
                resolve(this.user);
            });
        });
    }
};

export const AuthService = new Authentication();