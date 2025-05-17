import { Navigate } from "react-router";
import { useSelector } from "react-redux";

import Loading from "../ui/Loading";

const ProtectedRoute = ({children}) => {

    const { authenticate, initialized } = useSelector((state) => state.auth);

    if (!initialized) {
        return <Loading />; 
    }

    return authenticate ? children : <Navigate to="/landing" replace />
}

export default ProtectedRoute;