import { Outlet } from "react-router";
import "./App.css";
import Sidebar from "./components/layout/SideBar";
import Header from "./components/layout/Header";

function App() {
  return (
   <section className="flex md:bg-gray-100 min-h-screen">
      <Sidebar/>

      <div className="flex-grow text-gray-800">
        <Header />
        <main className="px-6 md:px-10 lg:px-14 xl:px-18 2xl:px-24 space-y-6">
          <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between items-center">
            <div className="mr-6">
              <h1 className="text-4xl font-semibold my-2">Dashboard</h1>
            </div>
          </div>

          <Outlet />
        </main>
      </div>
    </section>
  );
}

export default App;
