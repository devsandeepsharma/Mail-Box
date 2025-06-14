import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import "./header.css";
import Button from "../ui/Button";

const Header = () => {

    const location = useLocation();

    const { authenticate } = useSelector(state => state.auth);

    const [toggleNav, setToggleNav] = useState(false);

    const toggle = () => {
        setToggleNav(prev => !prev);
    }

    return (
        <header className="header">
            {
                location.pathname === "/landing" && (
                    <a className="skip-to-main-content" href="#main">Skip to main content</a>
                )
            }
            <Link className="header__logo" to={authenticate ? "/": "/landing"} >Mail Box</Link>
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
                    {
                        authenticate ? (
                            <>
                                <li className="nav__item">
                                    <Link to="/sent" onClick={toggle}>Sent Mail</Link>
                                </li>
                                <li className="nav__item">
                                    <Link to="/profile" onClick={toggle}>My Profile</Link>
                                </li>
                                <li className="nav__item link-btn">
                                    <Button to="/compose" onClick={toggle} isLink>Compose Email</Button>
                                </li>
                            </>
                        ) : (
                            <>
                                {
                                    location.pathname === "/landing" && (
                                        <>
                                            <li className="nav__item">
                                                <a href="#features" onClick={toggle}>Features</a>
                                            </li>
                                            <li className="nav__item">
                                                <a href="#editor" onClick={toggle}>Editor</a>
                                            </li>
                                            <li className="nav__item">
                                                <a href="#testimonials" onClick={toggle}>Testimonials</a>
                                            </li>
                                        </>
                                    )
                                }
                            
                            <li className={`nav__item link-btn ${location.pathname !== "/landing" && "auth"}`}>
                                <Button to="/login" variant="outline" isLink onClick={toggle}>Login</Button>
                            </li>
                            <li className={`nav__item link-btn ${location.pathname !== "/landing" && "auth"}`}>
                                <Button to="/signup" isLink onClick={toggle}>Sign Up</Button>
                            </li>
                            </>
                        )
                    }
                </ul>
            </nav>
        </header>
    )
}

export default Header;