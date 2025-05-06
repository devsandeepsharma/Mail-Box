import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

import "./landing.css";

const Landing = () => {

    const features = [
        {
            title: "Simple Interface",
            desc: "Compose and manage your emails easily with a minimal design that focuses on usability."
        },
        {
            title: "Send & Receive",
            desc: "Send emails to any user with real-time delivery using our smart backend system."
        },
        {
            title: "AI Rewriting",
            desc: "Convert casual messages into professional emails with a single click using built-in AI."
        },
        {
            title: "Secure Authentication",
            desc: "Ensure that only you have access to your account with industry-leading security features."
        },
        {
            title: "Manage Your Profile",
            desc: "Update your personal details, email settings, and preferences all in one place."
        },
        {
            title: "AI Integration",
            desc: "Seamlessly integrate AI to help craft emails that sound professional and clear."
        },
    ]

    return (
        <>
            <section className="hero">
                <h1 className="hero__title">
                    The Smartest Way to Send Emails
                </h1>
                <p className="hero__desc">
                    Mail Box is your AI-powered email companion that turns your 
                    casual words into professional conversations — in a click.
                </p>
                <Button type="link" to="/signup" className="hero__cta">Try it Now</Button>
            </section>
            <section id="features" className="features">
                <ul className="features__list">
                    {
                        features.map(feature => (
                            <li className="features__item">
                                <Card 
                                    title={feature.title}
                                    desc={feature.desc}
                                />
                            </li>
                        ))
                    }
                </ul>
            </section>
        </>
    )
}

export default Landing;