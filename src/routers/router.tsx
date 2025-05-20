import { createBrowserRouter, type RouteObject } from "react-router";
import App from "../App";
// import Dashboard from "@/pages/Dashboard";
// import Login from "@/pages/Login";
// import Sections from "@/pages/Sections";
// import Questions from "@/pages/Questions";
// import Contact from "@/pages/Contact";
// import WhyUs from "@/pages/WhyUs";
// import Services from "@/pages/Services";
import NotFound from "./NotFound";
import PrivateRoute from "./protectedRoute";
import { lazy } from "react";
import Banners from "@/pages/Banners";
import Policy from "@/pages/PrivacyPolicy";
import Settings from "@/pages/settings";
// import Terms from "@/pages/terms";

const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Login = lazy(() => import("@/pages/Login"));
const Sections = lazy(() => import("@/pages/Sections"));
const Questions = lazy(() => import("@/pages/Questions"));
const Contact = lazy(() => import("@/pages/Contact"));
const WhyUs = lazy(() => import("@/pages/WhyUs"));
const Services = lazy(() => import("@/pages/Services"));
const Terms = lazy(() => import("@/pages/terms"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "sections",
        element: <Sections />,
      },
      {
        path: "banners",
        element: <Banners />,
      },
      {
        path: "faq",
        element: <Questions />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "why-us",
        element: <WhyUs />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "terms-conditions",
        element: <Terms />,
      },
      {
        path: "terms-conditions",
        element: <Terms />,
      },
      {
        path: "privacy-policy",
        element: <Policy />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  {
    path: "*",
    element: <NotFound />,
  },
];

const router = createBrowserRouter(routes);

export default router;