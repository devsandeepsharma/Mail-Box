import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import AuthLayout from "./components/layout/AuthLayout";

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <h1>All Mails Page</h1>
        },
        {
          path: "/landing",
          element: <Landing />
        },
        {
          path: "/profile",
          element: <h1>Profile Page</h1>
        },
        {
          path: "/sent",
          element: <h1>Sent Mails Page</h1>
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/forgot-password",
          element: <ForgotPassword />
        },
        {
          path: "/signup",
          element: <Signup />
        },
      ]
    }
  ])
  
  return (
    <AuthLayout>
      <RouterProvider router={router} />
    </AuthLayout>
  )
}

export default App;