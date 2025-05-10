import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
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
          element: <ProtectedRoute><h1>All Mails Page</h1></ProtectedRoute>
        },
        {
          path: "/profile",
          element: <ProtectedRoute><Profile /></ProtectedRoute>
        },
        {
          path: "/sent",
          element: <ProtectedRoute><h1>Sent Mails Page</h1></ProtectedRoute>
        },
        {
          path: "/landing",
          element: <PublicRoute><Landing /></PublicRoute>
        },
        {
          path: "/login",
          element: <PublicRoute><Login /></PublicRoute>
        },
        {
          path: "/forgot-password",
          element: <PublicRoute><ForgotPassword /></PublicRoute>
        },
        {
          path: "/signup",
          element: <PublicRoute><Signup /></PublicRoute>
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