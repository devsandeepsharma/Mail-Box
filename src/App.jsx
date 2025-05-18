import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ComposeEmail from "./pages/ComposeEmail";
import SentEmails from "./pages/SentEmails";
import ReadEmail from "./pages/ReadEmail";
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
              <ComposeEmail />
            </ProtectedRoute>
          )
        },
        {
          path: "/sent",
          element: (
            <ProtectedRoute>
              <SentEmails />
            </ProtectedRoute>
          )
        },
        {
          path: "/:id",
          element: (
            <ProtectedRoute>
              <ReadEmail />
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