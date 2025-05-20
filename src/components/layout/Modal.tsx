import { Link, useLocation } from "react-router";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import NavigationItems from "./NavItems";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ isOpen, onClose }: ModalProps) => {
  const location = useLocation();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          "sm:max-w-[16rem] h-screen w-full max-w-none rounded-none rounded-r-lg p-0 flex flex-col",
          "data-[state=open]:slide-in-from-left-2 data-[state=closed]:slide-out-to-left-2",
          "top-0 left-0 translate-x-0 -translate-y-0",
          "sm:max-h-none"
        )}
      >
        <DialogHeader className="border-b p-4 h-20 flex items-center">
          <div className="flex items-center justify-between w-full">
            <h2 className="text-xl font-semibold">Menu</h2>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-4">
          <nav className="grid gap-1">
            {NavigationItems().map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary transition-colors",
                  location.pathname === item.path && "bg-muted text-primary"
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
