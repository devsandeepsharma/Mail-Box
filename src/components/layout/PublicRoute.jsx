import { Navigate } from "react-router";
import { useSelector } from "react-redux";

import Loading from "../ui/Loading";

const PublicRoute = ({ children }) => {
    const { authenticate, initialized } = useSelector((state) => state.auth);

    if (!initialized) {
        return <Loading />; 
    }

    return authenticate ? <Navigate to="/" replace /> : children;
}

export default PublicRoute;