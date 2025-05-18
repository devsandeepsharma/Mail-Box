import "./landing.css";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import TestimonialCard from "../components/ui/TestimonialCard";
import EmailEditorPreview from "../components/ui/EmailEditorPreview";

const Landing = () => {

    const features = [
        {
            title: "Smart Email Composer",
            desc: "Write rich, beautifully formatted emails using our Draft.js-powered editor — bold, lists, links, and more at your fingertips."
        },
        {
            title: "Real-Time Email Sync",
            desc: "Emails you send or receive show up instantly — no reloads, no delays, just smooth real-time updates."
        },
        {
            title: "Full Inbox Control",
            desc: "View, organize, and delete your sent and received emails — without affecting the sender's copy."
        },
        {
            title: "Profile Personalization",
            desc: "Upload a profile picture and update your username to personalize your mailing experience."
        },
        {
            title: "Secure Authentication",
            desc: "Sign up, log in, and recover passwords confidently with Firebase-backed authentication."
        },
        {
            title: "Minimal & Modern UI",
            desc: "Enjoy a clean, responsive design built for productivity — whether you're on desktop or mobile."
        }
    ];

    const testimonials = [
        {
            text: "Signing up was effortless, and updating my profile pic and username made the experience feel personal. It’s refreshing to see an email app that cares about the little things.",
            author: "@rahulxdev"
        },
        {
            text: "The Draft.js editor lets me format emails exactly how I want. Bold, lists, and links all work seamlessly. It’s like writing in a mini word processor but inside my inbox.",
            author: "@mohit_js"
        },
        {
            text: "Love the clean UI and smooth email sending.",
            author: "@code_kriti"
        },
        {
            text: "Deleting emails only from my side without bothering the sender is a game changer. Finally, inbox control that makes sense!",
            author: "@inbox_zero"
        },
        {
            text: "I’m impressed by how fast the app syncs emails in real-time. No waiting, no refreshing, just instant updates that keep me productive throughout the day.",
            author: "@ux_girl"
        },
        {
            text: "The password reset flow is smooth and hassle-free. I was back in my account in under two minutes. Such a relief when you forget your password!",
            author: "@lazylogins"
        }
    ];

    return (
        <main id="main" className="landing">
            <section className="hero">
                <h1 className="hero__title">
                    The Smartest Way to Send Emails
                </h1>
                <p className="hero__desc">
                    Mail Box is your all-in-one email client — write rich emails with our advanced editor, 
                    manage your profile, and control your messages like never before.
                </p>
                <Button isLink to="/signup" className="hero__cta">
                    Get Started for Free
                </Button>
            </section>
            <section id="features" className="features">
                <ul className="features__list">
                    {
                        features.map(feature => (
                            <li key={feature.title} className="features__item">
                                <Card 
                                    title={feature.title}
                                    desc={feature.desc}
                                />
                            </li>
                        ))
                    }
                </ul>
            </section>
            <section id="editor" className="editor-preview">
                <EmailEditorPreview />
            </section>
            <section id="testimonials" className="testimonials">
                <h2 className="testimonials__title">What People Are Saying</h2>
                <ul className="testimonials__list">
                    {
                        testimonials.map(testimonial => (
                            <li key={testimonial.author} className="list__item">
                                <TestimonialCard 
                                    text={testimonial.text}
                                    author={testimonial.author}
                                />
                            </li>
                        ))
                    }
                </ul>
            </section>
        </main>
    )
}

export default Landing;