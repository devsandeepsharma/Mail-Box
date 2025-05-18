import { Link } from "react-router-dom";

import "./emailCard.css";
import Button from "../ui/Button";

import { formatTimestamp } from "../../utils/formatDate";
import { EmailService } from "../../services/Email";

const EmailCard = ({ email, type="received", onDelete }) => {
    
    const formattedTime = formatTimestamp(email?.timestamp);

    const handleDelete = (e) => {
        e.preventDefault();
        e.stopPropagation()
        onDelete(email?.id);
    };

    const markAsRead = async () => {
        if(type === "sent") return;

        if (email.read) return;

        try {
            await EmailService.markAsRead(email.id);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Link  className="email-card" to={`/${email?.id}`} onClick={markAsRead}>
            <div className="email-card__header">
                <span className="email-card__receiver">
                    {type === "sent" ? `To: ${email?.to}` : `From: ${email?.from}`}
                </span>
                <span className="email-card__timestamp">{formattedTime}</span>
            </div>

            <div className="email-card__body">
                <div className="email-card__title-wrapper">
                    {
                        type !== "sent" &&
                        !email?.read && <span className="email-card__unread-dot" />
                    }
                    <h3 className={`email-card__title ${email?.read ? "normal" : ""}`}>
                        {email?.title}
                    </h3>
                </div>
                <Button
                    variant="outline"
                    className="email-card__delete-btn"
                    onClick={handleDelete}
                >
                    Delete
                </Button>
            </div>
        </Link>
    );
};

export default EmailCard;