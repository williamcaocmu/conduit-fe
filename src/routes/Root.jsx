import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import AuthContextProvider from "../contexts/AuthContextProvider";
import ArticleDetails from "./ArticleDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthContextProvider>
        <Layout />
      </AuthContextProvider>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "article/:slug",
        element: <ArticleDetails />,
      },
    ],
  },
]);

const Root = () => {
  return <RouterProvider router={router} />;
};

export default Root;
