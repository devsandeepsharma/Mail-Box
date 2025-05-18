import { useSelector } from "react-redux";

import "./pages.css";
import "./emailsPage.css";
import EmailCard from "../components/ui/EmailCard";

import { sortEmails } from "../utils/sortEmails";
import { EmailService } from "../services/Email";

const Home = () => {

    const receivedEmails = useSelector(state => state.emails.received);
    const sortedEmails = sortEmails(receivedEmails);

    const deleteEmail = async (id) => {
        await EmailService.deleteReceivedEmail(id);
    }

    if (!receivedEmails || receivedEmails.length === 0) {
        return (
            <main className="emails">
                <div className="empty-state">
                    <h2>📭 No new emails</h2>
                    <p>You're all caught up! Check back later for new messages.</p>
                </div>
            </main>
        );
    }

    return (
        <main className="emails">
            <ul className="emails__list">
                {
                    sortedEmails.map(email => (
                        <li className="emails__item" key={email.id} >
                            <EmailCard 
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

export default Home;