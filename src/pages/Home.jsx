import { useDispatch } from "react-redux";

import "./pages.css";
import Button from "../components/ui/Button";

import { AuthService } from "../services/Authentication";
import { authActions } from "../store/authSlice";

const Home = () => {

    const dispatch = useDispatch();

    const logoutUser = async () => {
        try {
            await AuthService.logout();
            dispatch(authActions.logout());
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <main>
            <h1>Home Page</h1>
            <Button
                style={{width: "fit-content", marginTop: "1rem"}}
                onClick={logoutUser}
            >
                Logout
            </Button>
        </main>
    )
}

export default Home;