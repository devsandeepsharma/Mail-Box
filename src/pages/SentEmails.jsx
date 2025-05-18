import { useDispatch, useSelector } from "react-redux";

import "./pages.css";
import "./emailsPage.css";
import EmailCard from "../components/ui/EmailCard";

import { sortEmails } from "../utils/sortEmails";
import { EmailService } from "../services/Email";
import { emailActions } from "../store/emailSlice";

const SentEmails = () => {

    const dispatch = useDispatch();
    const sentEmails = useSelector(state => state.emails.sent);
    const sortedEmails = sortEmails(sentEmails);

    const deleteEmail = async (id) => {
        await EmailService.deleteSentEmail(id);
        dispatch(emailActions.deleteSentEmail(id));
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