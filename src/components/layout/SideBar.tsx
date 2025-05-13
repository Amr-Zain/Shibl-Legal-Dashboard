import { Link, NavLink } from "react-router";
import {
  LayoutDashboard,
  BookMarked,
  HelpCircle,
  Contact,
  UserCog,
  LogOut,
  Award
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  return (
    <div className={cn(
      "hidden border-r bg-muted/40 md:block",
      "fixed top-0 left-0 h-screen w-48"
    )}>
      <div className="flex h-full flex-col gap-2">
        <div className="flex h-18 items-center border-b px-4">
          <Link to="/" className="text-center font-semibold">
            <span className="text-lg">Dashboard</span>
          </Link>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <nav className="grid items-start px-4 py-2 text-sm font-medium">
            {navigationItems.map((item) => (
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
            onClick={() => console.log("Logout")}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-all hover:text-primary"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

const navigationItems = [
  {
    path: "/",
    icon: LayoutDashboard,
    label: "Dashboard",
    end: true,
  },
  {
    path: "/sections",
    icon: BookMarked,
    label: "Sections",
  },
  {
    path: "/faq",
    icon: HelpCircle,
    label: "FAQ",
  },
  {
    path: "/contact",
    icon: Contact,
    label: "Contact",
  },
  {
    path: "/why-us",
    icon: Award,
    label: "Why Us",
  },
  {
    path: "/admin-users",
    icon: UserCog,
    label: "Admin Users",
  },
];