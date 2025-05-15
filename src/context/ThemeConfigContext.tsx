import { createContext, useContext, useState, useEffect } from "react";
import i18next from "i18next";

type ThemeConfigContextType = {
  theme: string;
  locale: 'ar'| 'en';
  rtlClass: string;
  toggleTheme: (payload?: string) => void;
  toggleLocale: () => void;
};

const ThemeConfigContext = createContext<ThemeConfigContextType>({
  theme: localStorage.getItem("theme") || "light",
  locale: localStorage.getItem("i18nextLng") as 'ar'|'en' || "ar",
  rtlClass: localStorage.getItem("rtlClass") || "rtl",
  toggleTheme: () => {},
  toggleLocale: () => {},
});

export const ThemeConfigProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );
  const [locale, setLocale] = useState<'ar'|'en'>(
    () => localStorage.getItem("i18nextLng") as 'ar'|'en'|| "en"
  );
  const [rtlClass, setRtlClass] = useState(
    () => localStorage.getItem("rtlClass") || "ltr"
  );

  const toggleTheme = (payload?: string) => {
    const newTheme = payload || theme;
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  const toggleRTL = () => {
    const newRtl = rtlClass === "rtl" ? "ltr" : "rtl";
    localStorage.setItem("rtlClass", newRtl);
    setRtlClass(newRtl);
    document.documentElement.setAttribute("dir", newRtl);
  };

  const toggleLocale = () => {
    const newLocale = locale === "ar" ? "en" : "ar";
    i18next.changeLanguage(newLocale);
    localStorage.setItem("i18nextLng", newLocale);
    toggleRTL();
    setLocale(newLocale);
  };

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }

    document.documentElement.setAttribute("dir", rtlClass);

    i18next.changeLanguage(locale);
  }, []);

  // Theme change effect
  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ThemeConfigContext
      value={{
        theme,
        locale,
        rtlClass,
        toggleTheme,
        toggleLocale,
      }}
    >
      {children}
    </ThemeConfigContext>
  );
};

export const useThemeConfig = () => {
  const context = useContext(ThemeConfigContext);
  return context;
};
