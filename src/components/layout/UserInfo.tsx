import { AuthContext } from "@/context/AuthProvider";
import { useContext } from "react";

const UserInfo = () => {
  const { currentUser } = useContext(AuthContext)!;
  return (
    <div className="flex flex-shrink-0 gap-2 items-center">
      <div className="hidden md:flex md:flex-col md:items-end md:leading-tight mr-4">
        <span className="font-semibold">{currentUser?.full_name}</span>
      </div>
      <div className="relative size-8 rounded-full overflow-hidden">
        <img
          src={currentUser?.image?.url || 'https://randomuser.me/api/portraits/men/7.jpg'}
          alt="User profile"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};
export default UserInfo;
