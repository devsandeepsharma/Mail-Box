import { useSelector } from "react-redux";

import "./pages.css";
import "./emailsPage.css";
import EmailCard from "../components/ui/EmailCard";

import { sortEmails } from "../utils/sortEmails";

const SentEmails = () => {

    const sentEmails = useSelector(state => state.emails.sent);
    const sortedEmails = sortEmails(sentEmails);

    const deleteEmail = (id) => {
        console.log("deleting...", id)
    }

    return (
        <main className="emails">
            <ul className="emails__list">
                {
                    sortedEmails.map(email => (
                        <li className="emails__item" key={email.id} >
                            <EmailCard 
                                type="sent" 
                                email={email} 
                                onDelete={deleteEmail}
                            />
                        </li>
                    ))
                }
            </ul>
        </main>
    )
}

export default SentEmails;