import {
  LayoutDashboard,
  Bookmark,
  List,        
  HelpCircle,      
  Award,
  Settings,
  FileText,
  ShieldCheck,
  
} from "lucide-react";
import { useTranslation } from "react-i18next";

const NavigationItems = () => {
    const { t } = useTranslation();
    return [
    {
      path: "/",
      icon: LayoutDashboard,
      label: t("sidebar.home"),
      end: true,
    },
    {
      path: "/banners",
      icon: Bookmark,
      label: t("sidebar.banners"),
    },
    {
      path: "/sections",
      icon: List, 
      label: t("sidebar.sections"),
    },
    {
      path: "/faq",
      icon: HelpCircle, 
      label: t("sidebar.faqs"),
    },
    {
      path: "/why-us",
      icon: Award,
      label: t("sidebar.whyUs"),
    },
    {
      path: "/services",
      icon: Award,
      label: t("sidebar.ourServices"),
    },
    {
      path: "/terms-conditions",
      icon: FileText,
      label: t("sidebar.terms"),
    },
    {
      path: "/privacy-policy",
      icon: ShieldCheck,
      label: t("sidebar.policy"),
    },
    {
      path: "/settings",
      icon: Settings,
      label: t("sidebar.settings"),
    },
  ];
};

export default NavigationItems;
