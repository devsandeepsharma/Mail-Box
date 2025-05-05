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
          element: <h1>All Mails Page</h1>
        },
        {
          path: "/landing",
          element: <h1>Landing Page</h1>
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
          element: <h1>Login Page</h1>
        },
        {
          path: "/signup",
          element: <h1>Signup Page</h1>
        },
      ]
    }
  ])
  
  return <RouterProvider router={router} />
}

export default App;