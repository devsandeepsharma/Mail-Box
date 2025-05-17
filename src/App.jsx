import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import AuthLayout from "./components/layout/AuthLayout";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import PublicRoute from "./components/layout/PublicRoute";

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          )
        },
        {
          path: "/profile",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          )
        },
        {
          path: "/compose",
          element: (
            <ProtectedRoute>
              <h1>Compose Email Page</h1>
            </ProtectedRoute>
          )
        },
        {
          path: "/sent",
          element: (
            <ProtectedRoute>
              <h1>Sent Emails Page</h1>
            </ProtectedRoute>
          )
        },
        {
          path: "/:id",
          element: (
            <ProtectedRoute>
              <h1>View Emails Page</h1>
            </ProtectedRoute>
          )
        },
        {
          path: "/landing",
          element: (
            <PublicRoute>
              <Landing />
            </PublicRoute>
          )
        },
        {
          path: "/login",
          element: (
            <PublicRoute>
              <Login />
            </PublicRoute>
          )
        },
        {
          path: "/signup",
          element: (
            <PublicRoute>
              <Signup />
            </PublicRoute>
          )
        },
        {
          path: "/forgot-password",
          element: (
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          )
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