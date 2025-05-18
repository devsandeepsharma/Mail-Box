import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import "./pages.css";
import "./readEmail.css";

const ReadEmail = () => {

    const { id } = useParams();
    const receivedEmails = useSelector((state) => state.emails.received);
    const sentEmails = useSelector((state) => state.emails.sent);

    const email =
        receivedEmails.find((email) => email.id === id) ||
        sentEmails.find((email) => email.id === id);

    return (
        <main className="read-email">
            <div className="read-email__card">
                {
                    email ? (
                        <>
                            <h1 className="read-email__title">{email.title}</h1>
                            <div className="read-email__meta">
                                <p><strong>From:</strong> {email.from}</p>
                                <p><strong>To:</strong> {email.to}</p>
                                <p><strong>Date:</strong> {new Date(email.timestamp).toLocaleString()}</p>
                            </div>
                            <div 
                                className="read-email__body"
                                dangerouslySetInnerHTML={{ __html: email.message }}
                            />
                        </>
                    ) : (
                        <p className="error-text">Email not found.</p>
                    )
                }
            </div>
        </main>
    );
};

export default ReadEmail;