import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <h1>✉️ Mail Box</h1>
            <Outlet />
        </>
    )
}

export default Layout;