import { Outlet } from "react-router";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import {  useEffect } from "react";

function App() {
  useEffect(() => {
    //if (!localStorage.getItem("token")) window.location.replace("/login");
  }, []);
  return (
    <div className="flex min-h-screen min-w-screen bg-gray-100">
      <aside className=" md:block w-18 md:w-48 flex-shrink-0">
        <Sidebar />
      </aside>
      <div className="flex-1">
        <Header />
        <main className="overflow-y-auto px-6">
          <div className="mx-auto min-h-[100hv] max-w-[calc(100vw-122px)] md:max-w-[calc(100vw-250px)]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
