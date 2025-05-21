import { createContext, useContext, useState, useEffect, useCallback } from "react";
import i18next from "i18next";

type ThemeConfigContextType = {
  theme: string;
  locale: 'ar' | 'en';
  rtlClass: 'rtl' | 'ltr';
  toggleTheme: (payload?: string) => void;
  toggleLocale: () => void;
};

const ThemeConfigContext = createContext<ThemeConfigContextType>({
  theme: "light",
  locale: "en",
  rtlClass: "ltr",
  toggleTheme: () => {},
  toggleLocale: () => {},
});

export const ThemeConfigProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "light";
  };

  const getInitialLocale = () => {
    const savedLang = localStorage.getItem("i18nextLng") || i18next.language;
    return (savedLang === 'ar' ? 'ar' : 'en');
  };

  const [theme, setTheme] = useState(getInitialTheme);
  const [locale, setLocale] = useState<'ar' | 'en'>(getInitialLocale);
  const [rtlClass, setRtlClass] = useState<'rtl' | 'ltr'>(
    locale === "ar" ? "rtl" : "ltr"
  );

  const updateRtlClass = useCallback((currentLocale: 'ar' | 'en') => {
    const newRtl = currentLocale === "ar" ? "rtl" : "ltr";
    localStorage.setItem("rtlClass", newRtl);
    setRtlClass(newRtl);
    document.documentElement.setAttribute("dir", newRtl);
  }, []);

  const toggleTheme = useCallback((payload?: string) => {
    const newTheme = payload || (theme === "dark" ? "light" : "dark");
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  }, [theme]);

  const toggleLocale = useCallback(() => {
    const newLocale = locale === "ar" ? "en" : "ar";
    setLocale(newLocale);
    localStorage.setItem("i18nextLng", newLocale);
    updateRtlClass(newLocale);
    i18next.changeLanguage(newLocale);
  }, [locale, updateRtlClass]);

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }

    document.documentElement.setAttribute("dir", rtlClass);

    if (i18next.language !== locale) {
      i18next.changeLanguage(locale);
    }
  }, []); 

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    i18next.changeLanguage(locale);
    updateRtlClass(locale);
  }, [locale, updateRtlClass]);

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