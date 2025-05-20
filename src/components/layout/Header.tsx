import { useState } from "react";
import Modal from "./Modal";
import { RiMenu2Fill } from "react-icons/ri";
import UserInfo from "./UserInfo";
import { useThemeConfig } from "@/context/ThemeConfigContext";
import { Globe } from "lucide-react";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toggleLocale, locale } = useThemeConfig();
  return (
    <header className="!sticky !top-0 h-18 px-6 z-10 sm:px-10 bg-white content-box border-b-1 border-b-gray-300 shadow-sm ">
      <div className="flex justify-between items-center h-18">
        <div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="block md:hidden relative flex-shrink-0 p-2 mr-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 focus:bg-gray-100 focus:text-gray-800 rounded-full"
          >
            <RiMenu2Fill className="h-6 w-6" />
            <span className="sr-only">Menu</span>
          </button>
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        <div className="flex items-center gap-2 text-muted-foreground">
          <div className="flex items-center gap-1 cursor-pointer" onClick={toggleLocale}>
            <Globe className="h-5 w-5" />
            {locale.toUpperCase()}
          </div>
          <UserInfo />
        </div>
      </div>
    </header>
  );
};
export default Header;
