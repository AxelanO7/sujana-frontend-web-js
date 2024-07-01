import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { BaseProps } from "../types/base";
import { useRecoilValue } from "recoil";
import { sidebarState } from "../core/store";

const BaseLayout = ({ children }: BaseProps) => {
  const sidebarOpen = useRecoilValue(sidebarState);
  return (
    <>
      <div className="h-screen bg-gray-100">
        <Navbar />
        <main className="overflow-hidden overflow-y-auto">
          <Sidebar />
          <div
            className={`${
              sidebarOpen ? "ml-[196px]" : "ml-[54px]"
            } transition-all duration-300 mt-[59px] min-h-[calc(100vh-59px)]  flex flex-col h-full`}
          >
            {children}
            <div className="grow pb-8" />
            <footer className="text-gray-600 text-center py-2 bg-gray-100 border-t-2 border-gray-200">
              © 2024 - Sujana Tour & Travel
            </footer>
          </div>
        </main>
      </div>
    </>
  );
};

export default BaseLayout;
