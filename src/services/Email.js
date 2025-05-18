import { getAuth } from "firebase/auth";
import { get, getDatabase, ref, update, onValue, remove } from "firebase/database";
import { v4 as uuid } from "uuid";

import { app } from "./config";
import { sanitizeEmail } from "../utils/sanitizeEmail";

class Email {
    constructor() {
        this.auth = getAuth(app);
        this.db = getDatabase(app);
    }

    sendEmail( toEmail, title, message ) {
        const senderUid = this.auth.currentUser.uid;
        const senderEmail = this.auth.currentUser.email
        const emailId = uuid();
        const timestamp = Date.now();

        const sanitizedReceiver = sanitizeEmail(toEmail);

        const composedEmail = {
            id: emailId,
            from: senderEmail,
            to: toEmail,
            title,
            message,
            timestamp,
            read: false
        };

        const updates = {
            [`emails/sent/${senderUid}/${emailId}`]: composedEmail,
            [`emails/received/${sanitizedReceiver}/${emailId}`]: composedEmail,
        };

        return update(ref(this.db), updates).then(() => composedEmail);
    }

    getSentEmails() {
        const userUid = this.auth.currentUser.uid;
        const dbRef = ref(this.db, `emails/sent/${userUid}`);

        return get(dbRef).then((snapshot) => {
            const data = snapshot.val();
            return data ? Object.values(data) : [];
        });
    }

    deleteSentEmail(emailId) {
        const userUid = this.auth.currentUser.uid;
        const emailRef = ref(this.db, `emails/sent/${userUid}/${emailId}`);

        return remove(emailRef);
    }

    listenToReceivedEmails(callback) {
        const userEmail = this.auth.currentUser.email;
        const sanitized = sanitizeEmail(userEmail);
        const dbRef = ref(this.db, `emails/received/${sanitized}`);

        const unsubscribe = onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            const emails = data ? Object.values(data) : [];
            callback(emails);
        });

        return unsubscribe;
    }

    deleteReceivedEmail(emailId) {
        const userEmail = this.auth.currentUser.email;
        const sanitized = sanitizeEmail(userEmail);
        const emailRef = ref(this.db, `emails/received/${sanitized}/${emailId}`);

        return remove(emailRef);
    }

    markAsRead(emailId) {
        const userEmail = this.auth.currentUser.email;
        const sanitized = sanitizeEmail(userEmail);
        const emailRef = ref(this.db, `emails/received/${sanitized}/${emailId}`);

        return update(emailRef, { read: true });
    }

}

export const EmailService = new Email();