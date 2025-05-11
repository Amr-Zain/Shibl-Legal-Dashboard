import { NavLink, Link } from "react-router";
import img from "../../assets/logo.png";
import { HiOutlineUserAdd, HiViewGridAdd } from "react-icons/hi";
import { IoBookOutline } from "react-icons/io5";
import { HiOutlineLogout } from "react-icons/hi";

const Sidebar = () => {
  const handleLogout = async () => {
    //navigate("/");
  };
  return (
    <aside className="hidden sm:flex sm:flex-col w-20 sticky left-0 top-0 h-[100vh]">
      <Link
        to="/"
        className="inline-flex items-center justify-center h-[71px] w-20 bg-primary hover:bg-primary/100"
      >
        <img src={img} alt="logo" className="p-4" />
      </Link>
      <div className="flex-grow flex flex-col justify-between text-gray-500 bg-secondary">
        <nav className="flex flex-col mx-4 my-6 space-y-4">
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={() => window.scrollTo(0, 0)}
              className={({ isActive }) =>
                `inline-flex items-center justify-center py-3 rounded-lg transition-colors ${
                  isActive
                    ? "text-primary bg-white shadow-md"
                    : "hover:text-gray-400 hover:bg-gray-700 focus:bg-gray-700"
                }`
              }
            >
              <span className="sr-only">{item.label}</span>
              {item.icon}
            </NavLink>
          ))}
        </nav>
        <div className="inline-flex items-center justify-center h-20 w-20 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="p-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg transition-colors"
            aria-label="Logout"
          >
            <HiOutlineLogout className="h-6 w-6" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

const navigationItems = [
  {
    path: "/",
    icon: (
      <svg
        aria-hidden="true"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
    label: "Dashboard",
    end: true,
  },
  {
    path: "/add-section",
    icon: <HiViewGridAdd className="h-6 w-6" />,
    label: "Add Section",
  },
  {
    path: "/manage-sections",
    icon: <IoBookOutline className="h-6 w-6" />,
    label: "Manage Website",
  },
  {
    path: "/add-admin",
    icon: <HiOutlineUserAdd className="h-6 w-6" />,
    label: "Add Admin",
  },
];
