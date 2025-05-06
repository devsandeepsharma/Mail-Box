import { useState } from "react";
import { Link } from "react-router-dom";

import "./header.css";
import Button from "../ui/Button";

const Header = () => {

    const [toggleNav, setToggleNav] = useState(false);

    const toggle = () => {
        setToggleNav(prev => !prev);
    }

    return (
        <header className="header">
            <a className="skip-to-main-content" href="#main">Skip to main content</a>
            <Link className="header__logo" to="/landing">Mail Box</Link>
            <nav className="header__nav" aria-label="primary navigation">
                <Button 
                    className="nav__button" 
                    aria-controls="nav-list" 
                    aria-expanded={toggleNav} 
                    onClick={toggle}
                >
                    <span className="sr-only">menu</span>
                    <div className="line one"></div>
                    <div className="line two"></div>
                    <div className="line three"></div>
                </Button>
                <ul id="navlist" className="nav__list">
                    <li className="nav__item">
                        <a href="#features" onClick={toggle}>Features</a>
                    </li>
                    <li className="nav__item">
                        <a href="#tryai" onClick={toggle}>Try AI</a>
                    </li>
                    <li className="nav__item">
                        <a href="#testimonials" onClick={toggle}>Testimonials</a>
                    </li>
                    <li className="nav__item">
                        <Link to="/login" onClick={toggle}>Login</Link>
                    </li>
                    <li className="nav__item">
                        <Button type="link" to="/signup" style={{width: "100%"}} onClick={toggle}>Sign Up</Button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;