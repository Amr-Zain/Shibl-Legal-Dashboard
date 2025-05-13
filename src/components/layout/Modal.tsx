import { Link, useLocation } from "react-router";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import {
  LayoutDashboard,
  BookMarked,
  HelpCircle,
  Contact,
  UserCog,
  Award,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ isOpen, onClose }: ModalProps) => {
  const location = useLocation();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-md h-screen w-full max-w-none rounded-none sm:rounded-l-lg sm:max-h-none p-0"
      >
        <div className="border-b p-4 h-fit">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Menu</h2>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <nav className="grid gap-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary",
                  location.pathname === item.path ? "bg-muted text-primary" : ""
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;

const navigationItems = [
  {
    path: "/",
    icon: LayoutDashboard,
    label: "Dashboard",
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