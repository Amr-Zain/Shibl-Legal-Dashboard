import { createPortal } from "react-dom";
import { Link } from "react-router";
import { IoBookOutline, IoCloseOutline } from "react-icons/io5";
import { HiOutlineUserAdd, HiViewGridAdd } from "react-icons/hi";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ isOpen, onClose }: ModalProps) => {
  return createPortal(
    <div
      className={`fixed inset-0 z-150 origin-left transition-all duration-300 ${
        isOpen ? "translate-0" : "translate-[-100%]"
      }`}
    >
      <div
        className={`fixed inset-0 backdrop-blur-[1.25px]`}
        onClick={onClose}
      />

      <div
        className={`fixed left-0 top-0 h-screen w-96 bg-white shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <div className="h-full flex flex-col">
          <div className="bg-white border-b border-b-gray-200 shadow-sm">
            <div className="flex justify-between items-center px-6 py-2">
              <h3 className="text-xl text-gray-900 font-semibold">Menu</h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <IoCloseOutline className="w-6 h-6 text-secondary" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <ul>
              {navigationItems.map((item) => (
                <li key={item.path}>
                  <Link
                    className="flex gap-2 mb-4 text-gray-700"
                    to={item.path}
                    onClick={onClose}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("root2")!
  );
};

export default Modal;

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
