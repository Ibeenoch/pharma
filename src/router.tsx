import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const Home = lazy(() => import('./pages/Home'))

const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },

  ]);

export default router;