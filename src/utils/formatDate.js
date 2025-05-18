export const isToday = (date) => {
    const today = new Date();
    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    );
};

export const formatTimestamp = (timestamp) => {
    const dateObj = new Date(timestamp);
    return isToday(dateObj)
        ? dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        : dateObj.toLocaleDateString([], { day: "2-digit", month: "short" });
};