import { Outlet } from "react-router";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";

function App() {
  return (
    <div className="flex min-h-screen min-w-screen bg-gray-100">
      <aside className="hidden md:block w-48 flex-shrink-0">
        <Sidebar />
      </aside>
      <div className="flex-1">
        <Header />
        <main className="overflow-y-auto px-6">
          <div className="mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
