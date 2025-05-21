import { AuthContext } from "@/context/AuthProvider";
import { useContext } from "react";
import { Link } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useThemeConfig } from "@/context/ThemeConfigContext";
import { useTranslation } from "react-i18next";

const UserInfo = () => {
  const { currentUser, logout } = useContext(AuthContext)!;
  const { t } = useTranslation();
  const navigation = [
    { name: t("formsTitle.edit_profile"), href: "/profile-data" },
    { name: t("formsTitle.change_password"), href: "/reset-password" },
  ];
  const { rtlClass } = useThemeConfig();
  return (
    <div className="flex flex-shrink-0 gap-2 items-center">
      <div className="hidden md:flex md:flex-col md:items-end md:leading-tight mr-4">
        <span className="font-semibold">{currentUser?.full_name}</span>
      </div>

      <DropdownMenu dir={rtlClass}>
        <DropdownMenuTrigger asChild>
          <div className="relative size-8 rounded-full overflow-hidden cursor-pointer">
            <img
              src={currentUser?.image?.url}
              alt="User profile"
              className="h-full w-full object-cover"
            />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48">
          {navigation.map((item) => (
            <DropdownMenuItem key={item.name} asChild>
              <Link to={item.href} className="cursor-pointer">
                {item.name}
              </Link>
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem onSelect={logout}>
            {t("sidebar.logout")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserInfo;
