import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "../styles/index.css";
import { createBrowserRouter, redirect, RouterProvider } from "react-router";
import { Home, Login, Signup } from "./pages";
import ReactGueryWraper from "./components/wrappers/ReactGueryWrapper";
import isAuthenticated from "./utils/isAuthenticated";
import ErrorBoundary from "./components/ErrorBoundary";

const router = createBrowserRouter([
  {
    path: "/",
    loader: async () => {
      const isAuth = await isAuthenticated();
      if (!isAuth) return redirect("/login");
      return null;
    },
    element: <Home />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/signup",
    loader: async () => {
      const isAuth = await isAuthenticated();
      if (isAuth) {
        return redirect("/");
      }
      return null;
    },
    element: <Signup />,
  },
  {
    path: "/login",
    loader: async () => {
      const isAuth = await isAuthenticated();
      if (isAuth) {
        return redirect("/");
      }
      return null;
    },
    element: <Login />,
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <></>
    <ReactGueryWraper>
      <RouterProvider router={router} />
    </ReactGueryWraper>
  </StrictMode>
);
