import { Link } from "react-router-dom";

import "./button.css";

const Button = ({ variant="primary", isLink=false, children, className, ...props }) => {

    const Element = isLink ? Link : "button";

    return (
        <Element className={`btn btn-${variant} ${className}`} {...props}>
            {children}
        </Element>
    )
}

export default Button;