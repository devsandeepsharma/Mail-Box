import "./testimonialCard.css";

const TestimonialCard = ({ text, author }) => {
    return (
        <div className="testimonialCard">
            <p className="testimonialCard__text">{text}</p>
            <p className="testimonialCard__author">{author}</p>
        </div>
    )
}

export default TestimonialCard;