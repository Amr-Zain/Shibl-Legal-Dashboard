import { AuthContext } from "@/context/AuthProvider";
import { useContext } from "react";
import { Link } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserInfo = () => {
  const { currentUser, logout } = useContext(AuthContext)!;
  const navigation = [
    { name: "Profile Data", href: "/profile-data" },
    { name: "ResetPassword", href: "/reset-password" },
  ];

  return (
    <div className="flex flex-shrink-0 gap-2 items-center">
      <div className="hidden md:flex md:flex-col md:items-end md:leading-tight mr-4">
        <span className="font-semibold">{currentUser?.full_name}</span>
      </div>

      <DropdownMenu>
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
              <Link
                to={item.href}
                onClick={() => window.scrollTo(0, 0)}
                className="cursor-pointer"
              >
                {item.name}
              </Link>
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem onSelect={logout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserInfo;
