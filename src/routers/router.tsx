import { createBrowserRouter, type RouteObject } from "react-router";
import App from "../App";
import Dashboard from "@/pages/Dashboard";
import Login from '@/pages/Login'
import Sections from "@/pages/Sections";
import Questions from "@/pages/Questions";
import Contact from "@/pages/Contact";
import WhyUs from "@/pages/WhyUs";

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
        path:'sections',
        element: <Sections />
      },
      {
        path:'faq',
        element: <Questions />
      },
      {
        path:'contact',
        element: <Contact />
      },
      {
        path:'why-us',
        element: <WhyUs />
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
