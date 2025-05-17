export const sanitizeEmail = (email) => {
    return email.replace(/\./g, ",");
}