import { Link } from "react-router-dom";

import "./button.css";

const Button = ({ varient="primary", isLink=false, children, className, ...props }) => {

    const Element = isLink ? Link : "button";

    return (
        <Element className={`btn ${varient} ${className}`} {...props}>
            {children}
        </Element>
    )
}

export default Button;