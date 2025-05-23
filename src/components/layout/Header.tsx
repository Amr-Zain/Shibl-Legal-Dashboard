import UserInfo from "./UserInfo";
import { useThemeConfig } from "@/context/ThemeConfigContext";
import { Globe } from "lucide-react";

const Header = () => {
  const { toggleLocale, locale } = useThemeConfig();
  return (
    <header className="!sticky !top-0 h-18 px-6 z-10 sm:px-10 bg-white content-box border-b-1 border-b-gray-300 shadow-sm ">
      <div className="flex justify-between items-center h-18">
        <div></div>

        <div className="flex items-center gap-2 text-muted-foreground">
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={toggleLocale}
          >
            <Globe className="h-5 w-5" />
            {locale =='ar'?'EN':'AR'}
          </div>
          <UserInfo />
        </div>
      </div>
    </header>
  );
};
export default Header;
