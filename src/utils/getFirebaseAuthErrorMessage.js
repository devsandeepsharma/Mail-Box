export const getFirebaseAuthErrorMessage = (error) => {
    if (!error || !error.code) return "Something went wrong. Please try again.";

    switch (error.code) {
        // Signup errors
        case "auth/email-already-in-use":
            return "This email is already registered.";
        
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
