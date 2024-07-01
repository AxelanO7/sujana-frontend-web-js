import {
  HomeIcon,
  DocumentArrowDownIcon,
  ClipboardIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import { useRecoilValue } from "recoil";
import { sidebarState } from "../core/store";
import { useEffect, useState } from "react";
import { TableCellsIcon } from "@heroicons/react/20/solid";

const Sidebar = () => {
  const sidebarOpen = useRecoilValue(sidebarState);

  const handleSidebar = (route: string) => {
    window.location.href = route;
  };

  const [role, setRole] = useState("");

  useEffect(() => {
    const localRole = localStorage.getItem("role");
    setRole(localRole || "outlet");
  }, []);

  return (
    <>
      <div className="h-screen fixed top-16 left-0 z-10 select-none bg-gray-800 text-white">
        <p
          className={`${
            sidebarOpen ? "text-2xl py-4" : "text-xl py-3"
          } font-bold text-center border-b-2 border-gray-700`}
          onClick={() => handleSidebar("/dashboard")}
        >
          {sidebarOpen ? "Main Menu" : "S"}
        </p>
        <div className="hover:bg-gray-700 cursor-pointer transition-all duration-300 ease-in-out border-b border-gray-700">
          <div
            className={`${
              sidebarOpen ? "mx-8 h-16" : "mx-4 h-12"
            } flex items-center h-16`}
            onClick={() => handleSidebar("/")}
          >
            <HomeIcon className="h-6 w-6" />
            {sidebarOpen && <p className="ml-4">Dashboard</p>}
          </div>
        </div>
        <div className="hover:bg-gray-700 cursor-pointer transition-all duration-300 ease-in-out border-b border-gray-700">
          <div
            className={`${
              sidebarOpen ? "mx-8 h-16" : "mx-4 h-12"
            } flex items-center`}
            onClick={() => handleSidebar("/ordering")}
          >
            <DocumentArrowDownIcon className="h-6 w-6 " />
            {sidebarOpen && <p className="ml-4">Pemesanan</p>}
          </div>
        </div>
        {role === "admin" && (
          <div>
            <div className="hover:bg-gray-700 cursor-pointer transition-all duration-300 ease-in-out border-b border-gray-700">
              <div
                className={`${
                  sidebarOpen ? "mx-8 h-16" : "mx-4 h-12"
                } flex items-center`}
                onClick={() => handleSidebar("/order")}
              >
                <TableCellsIcon className="h-6 w-6 " />
                {sidebarOpen && <p className="ml-4 w-24">Data Pemesanan</p>}
              </div>
            </div>
            <div className="hover:bg-gray-700 cursor-pointer transition-all duration-300 ease-in-out border-b border-gray-700">
              <div
                className={`${
                  sidebarOpen ? "mx-8 h-16" : "mx-4 h-12"
                } flex items-center`}
                onClick={() => handleSidebar("/report")}
              >
                <ClipboardIcon className="h-6 w-6 " />
                {sidebarOpen && <p className="ml-4">Laporan</p>}
              </div>
            </div>
            <div className="hover:bg-gray-700 cursor-pointer transition-all duration-300 ease-in-out border-b border-gray-700">
              <div
                className={`${
                  sidebarOpen ? "mx-8 h-16" : "mx-4 h-12"
                } flex items-center`}
                onClick={() => handleSidebar("/user")}
              >
                <UserIcon className="h-6 w-6" />
                {sidebarOpen && <p className="ml-4">Akun</p>}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
