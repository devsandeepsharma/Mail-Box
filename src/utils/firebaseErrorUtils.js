export const getFirebaseAuthErrorMessage = (error) => {
    if (!error || !error.code) return "Something went wrong. Please try again.";

    switch (error.code) {
        // Signup errors
        case "auth/email-already-in-use":
            return "This email is already registered.";
        case "auth/invalid-email":
            return "Please enter a valid email address.";
        case "auth/weak-password":
            return "Password is too weak. Use at least 6 characters.";
        
        // Login errors
        case "auth/user-not-found":
            return "No account found with this email.";
        case "auth/wrong-password":
            return "Incorrect password. Please try again.";
        case "auth/invalid-credential":
            return "Invalid login credentials.";
        
        // Forgot password
        case "auth/missing-email":
            return "Email not found.";
        
        // Generic / shared
        case "auth/too-many-requests":
            return "Too many failed attempts. Try again later.";
        case "auth/network-request-failed":
            return "Network error. Check your connection.";
        case "auth/internal-error":
            return "An internal error occurred. Try again later.";
        case "auth/configuration-not-found":
            return "Auth configuration is missing. Check Firebase setup.";
        
        default:
            return "Unexpected error occurred. Please try again.";
    }
}
