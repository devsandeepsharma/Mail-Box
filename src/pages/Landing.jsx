import { useRef, useState } from "react";
import { Formik, Form, Field } from "formik";

import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import TestimonialCard from "../components/ui/TestimonialCard";

import "./landing.css";

const Landing = () => {

    const typingIntervalRef = useRef(null);

    const [aiResponse, setAiResponse] = useState("");

    const simulateTyping = (text, setter) => {
        let index = 0;
        setter(""); 
    
        if (typingIntervalRef.current) {
            clearInterval(typingIntervalRef.current);
        }
    
        typingIntervalRef.current = setInterval(() => {
            setter(prev => {
                if (index < text.length) {
                    const updated = prev + text[index];
                    index++;
                    return updated;
                } else {
                    clearInterval(typingIntervalRef.current);
                    return prev;
                }
            });
        }, 30);

    };    

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

    const testimonials = [
        {
          text: "The AI rewriting is shockingly good. I use it daily now. It takes what I write and turns it into something way more thoughtful and professional without sounding robotic. It’s honestly better than anything I could write on my own.",
          author: "@arjun_ai",
        },
        {
          text: "I love how fast and intuitive Mail Box is. It has made managing emails so easy!",
          author: "@techie_ash",
        },
        {
          text: "Mail Box transformed the way I handle professional emails. Never going back!",
          author: "@john_doe",
        },
        {
          text: "Honestly shocked at how professional my messages look now. Huge confidence boost.",
          author: "@email_wizard",
        },
        {
          text: "Tried it on a casual follow-up email, and it turned it into something that actually got a response! The tone, the language, the flow — it was spot on.",
          author: "@sarah_dev",
        },
        {
          text: "At first I thought this was just a gimmick, but it actually works. The tone correction is subtle but super effective. It’s like having an editor in your pocket.",
          author: "@mail_maniac",
        },
    ];
      

    const handleFormSubmit = ({ message }) => {
        const res = "Hi, I hope you're doing well. I just wanted to follow up on our previous conversation. Please let me know when you're available to discuss further."
        simulateTyping(res,setAiResponse)
        console.log(message)
    }

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
                <Button isLink={true} to="/signup" className="hero__cta">Try it Now</Button>
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
            <section id="tryai" className="tryai">
                <h2 className="tryai__title">Turn this into a Professional Email</h2>
                <div className="tryai__box">
                    <Formik
                        initialValues={{ message: "hey, just wanted to follow up about the thing we talked about. lmk when you're free." }}
                        onSubmit={(values, actions) => {
                            handleFormSubmit(values);
                            actions.setSubmitting(false);
                        }}
                    >
                        <Form className="tryai__form">
                            <label htmlFor="message">You write:</label>
                            <Field as="textarea" name="message" className="tryai__input" />
                            <Button>Rewrite with AI</Button>
                        </Form>
                    </Formik>

                    <div className="tryai__output">
                        <p className="tryai__label">AI rewrites:</p>
                        <div className="tryai__response">
                            {aiResponse && aiResponse}
                        </div>
                    </div>
                </div>
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
        </>
    )
}

export default Landing;