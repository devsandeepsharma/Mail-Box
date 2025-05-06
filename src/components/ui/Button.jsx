import { Link } from "react-router-dom";

import "./button.css";

const Button = ({ varient="primary", type="button", children, className, ...props }) => {

    const Element = type === "button" ? "button" : Link;

    return (
        <Element className={`btn ${varient} ${className}`} {...props}>
            {children}
        </Element>
    )
}

export default Button;