import { useRecoilState } from "recoil";
import { sidebarState } from "../core/store";
import { Bars3Icon } from "@heroicons/react/16/solid";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@sc/components//ui/popover";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useRecoilState(sidebarState);

  const toogleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <>
      <nav className="flex justify-between py-4 h-16 items-center w-screen fixed top-0 z-10 shadow-md ps-4 pe-8 border-b-2 bg-gray-800 select-none text-white">
        <div className="flex items-center font-bold">
          <Bars3Icon className="h-6 w-6" onClick={toogleSidebar} />
          <p className="ml-4">Sujana Tour & Travel</p>
        </div>
        <Popover>
          <PopoverTrigger className="flex items-center">
            <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center" />
            <p className="ml-4">User</p>
          </PopoverTrigger>
          <PopoverContent
            className="bg-white shadow-md rounded-lg p-0"
            style={{ width: "120px" }}
          >
            <div
              className="flex cursor-pointer transition-all duration-300 ease-in-out hover:bg-gray-200  rounded-lg p-2  text-gray-800 text-sm"
              onClick={handleLogout}
            >
              <ArrowRightStartOnRectangleIcon className="h-5 w-5" />
              <p className={clsx("ml-2", "text-gray-800")}>Logout</p>
            </div>
          </PopoverContent>
        </Popover>
      </nav>
    </>
  );
};

export default Navbar;
