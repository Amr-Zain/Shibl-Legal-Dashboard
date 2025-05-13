import { useState } from "react";
import Modal from "./Modal";
import { RiMenu2Fill } from "react-icons/ri";
import UserInfo from "./UserInfo";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <header className="!sticky !top-0 h-18 px-6 z-10 sm:px-10 bg-white content-box border-b-1 border-b-gray-300 shadow-sm">
      <div className="flex items-center h-18">
        <button
        onClick={()=>setIsModalOpen(true)}
          className="block sm:hidden relative flex-shrink-0 p-2 mr-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 focus:bg-gray-100 focus:text-gray-800 rounded-full"
        >
          <RiMenu2Fill className="h-6 w-6" />
          <span className="sr-only">Menu</span>
        </button>

        <div className="relative w-full h-10 max-w-md sm:-ml-2">
          <svg
            className="absolute h-6 w-6 mt-2.5 ml-2 text-gray-400"
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="text"
            role="search"
            placeholder="Search..."
            className="py-2 pl-10 pr-4 w-[90%] border-1 border-gray-400 bg-blackBG focus:outline-none placeholder-gray-600 focus:bg-gray-50 rounded-lg"
          />
        </div>

        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
        />

        <UserInfo />
      </div>
    </header>
  );
};
export default Header;
