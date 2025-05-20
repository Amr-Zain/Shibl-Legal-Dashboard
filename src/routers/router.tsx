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
import SectionForm from "@/components/sections/SectionForm";
import { QuestionsForm } from "@/components/questions/questionForm";
import { TitleFeatureForm } from "@/components/sections/TitleFeatueForm";
import { WhyUsForm } from "@/components/whyUs/WhyUsForm";
import ProfileFrom from "@/components/settings/ProfileForm";
import UpdatePasswordForm from "@/components/settings/UpdatePasswordForm";
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
        children: [
          { index: true, element: <Sections /> },
          { path: "create", element: <SectionForm /> },
          { path: "edit/:id", element: <SectionForm isUpdate /> },
        ],
      },
      {
        path: "banners",
        children: [
          { index: true, element: <Banners /> },
          { path: "create", element: <SectionForm isBanner /> },
          { path: "edit/:id", element: <SectionForm isBanner isUpdate /> },
        ],
      },
      {
        path: "faq",
        children: [
          { index: true, element: <Questions /> },
          { path: "create", element: <QuestionsForm /> },
          { path: "edit/:id", element: <QuestionsForm isUpdate /> },
        ],
      },
      {
        path: "settings",
        element: <Contact />,
      },
      {
        path: "why-us",
         children: [
          { index: true, element: <WhyUs /> },
          { path: "create", element: <WhyUsForm /> },
          { path: "edit/:id", element: <WhyUsForm isUpdate /> },
        ],
      },
      {
        path: "services",
        children: [
          { index: true, element: <Services /> },
          { path: "create", element: <TitleFeatureForm  /> },
          { path: "edit/:id", element: <TitleFeatureForm isUpdate /> },
        ],
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
        path: "profile-data",
        element: <ProfileFrom />,
      },
      {
        path: "reset-password",
        element: <UpdatePasswordForm />,
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
