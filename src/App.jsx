import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/layout/Layout";

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <h1>Home Page</h1>
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
          element: <h1>Landing Page</h1>
        },
        {
          path: "/login",
          element: <h1>Login Page</h1>
        },
        {
          path: "/signup",
          element: <h1>Signup Page</h1>
        },
        {
          path: "/forgot-password",
          element: <h1>Forgot Password Page</h1>
        },
      ]
    }
  ])

  return <RouterProvider router={router} />
}

export default App;