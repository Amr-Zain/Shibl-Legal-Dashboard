import { Link, NavLink } from "react-router";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";
import { useTranslation } from "react-i18next";
import NavigationItems from "./NavItems";

export default function Sidebar() {
  const { logout } = useContext(AuthContext)!;
  const { t } = useTranslation();

  return (
    <div
      className={cn(
        "hidden border-r bg-white md:block",
        "fixed top-0 start-0 h-screen w-48 border-e"
      )}
    >
      <div className="flex h-full flex-col gap-2">
        <div className="flex h-18 items-center border-b px-4">
          <Link to="/" className="text-center font-semibold">
            <span className="text-lg text-center">
              {t("sidebar.dashboard")}
            </span>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto">
          <nav className="grid items-start px-4 py-2 text-sm font-medium">
            {NavigationItems().map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                    isActive ? "bg-muted text-primary" : "text-muted-foreground"
                  )
                }
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="p-4">
          <button
            onClick={() => logout()}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-all hover:text-primary"
          >
            <LogOut className="h-4 w-4" />
            {t("sidebar.logout")}
          </button>
        </div>
      </div>
    </div>
  );
}
