import Header from "./Header";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";

const AppLayout = () => {
  return (
    <div>
      <ScrollToTop/>
      <div className="grid-background"></div>
      <main className="min-h-screen container px-8 ">
        <Header />
        <Outlet />
      </main>
      
      <div className="p-10 text-center bg-gray-800 mt-10">
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} JobSphere. All rights reserved.
        </p>
        <p className="text-sm text-gray-400">
          Designed and developed with care to provide exceptional user experience and innovative solutions.
        </p>
      </div>
    </div>
  );
};

export default AppLayout;