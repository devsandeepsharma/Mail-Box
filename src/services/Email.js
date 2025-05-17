import { getAuth } from "firebase/auth";
import { getDatabase, ref, update } from "firebase/database";
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
}

export const EmailService = new Email();