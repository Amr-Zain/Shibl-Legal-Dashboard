import { createBrowserRouter, type RouteObject } from "react-router";
import App from "../App";
import Dashboard from "@/pages/Dashboard";
import AddSection from "@/pages/AddSections";
import Login from '@/pages/Login'
import Sections from "@/pages/Sections";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,//wrappe with outh
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "add-section",
        element: <AddSection />,
      },
      {
        path:'manage-sections',
        element: <Sections />
      }
    ],
  },
  { path: '/login',
    element: <Login />
  },
  {
    path: "*",
    element: <div>Not Found</div>,
  },
];

const router = createBrowserRouter(routes);

export default router;
