import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    updateProfile 
} from "firebase/auth";

import { app } from "./config";

class Authentication {
    constructor() {
        this.auth = getAuth(app);
    }

    signup(email, password) {
        return createUserWithEmailAndPassword(this.auth, email, password);
    }

    updateUserProfile(fullName, photoURL) {
        return updateProfile(this.auth.currentUser, {displayName: fullName, photoURL: photoURL});
    }
}

export const AuthService = new Authentication();