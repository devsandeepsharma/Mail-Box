import { useSelector } from "react-redux";

import "./pages.css";
import "./emailsPage.css";
import EmailCard from "../components/ui/EmailCard";

import { sortEmails } from "../utils/sortEmails";
import { EmailService } from "../services/Email";

const Home = () => {

    const receicedEmails = useSelector(state => state.emails.received);
    const sortedEmails = sortEmails(receicedEmails);

    const deleteEmail = async (id) => {
        await EmailService.deleteReceivedEmail(id);
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