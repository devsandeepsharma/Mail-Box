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
            <Link className="header__logo" to="/" >Mail Box</Link>
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
                    <li className="nav__item link-btn">
                        <Button to="/login" variant="outline" isLink onClick={toggle}>Login</Button>
                    </li>
                    <li className="nav__item link-btn">
                        <Button to="/signup" isLink onClick={toggle}>Sign Up</Button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;