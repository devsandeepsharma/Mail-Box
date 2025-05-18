export const sortEmails = (emails) => {
    return [...emails].sort((a, b) => b.timestamp - a.timestamp);
}