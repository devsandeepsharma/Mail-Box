import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import AuthLayout from "./components/layout/AuthLayout";

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/profile",
          element: <h1>Profile Page</h1>
        },
        {
          path: "/compose",
          element: <h1>Compose Email Page</h1>
        },
        {
          path: "/sent",
          element: <h1>Sent Emails Page</h1>
        },
        {
          path: "/:id",
          element: <h1>View Emails Page</h1>
        },
        {
          path: "/landing",
          element: <Landing />
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/signup",
          element: <Signup />
        },
        {
          path: "/forgot-password",
          element: <ForgotPassword />
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