import { Outlet, useLocation } from "@tanstack/react-router";
import Navbar from "./components/Navbar";
import NotificationSystem from "./components/NotificationSystem";

function RootLayout() {
  const location = useLocation();


  const routesWithoutNavbar = ['/auth'];


  const shouldHideNavbar = routesWithoutNavbar.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50">
      
      {!shouldHideNavbar && <Navbar />}

      <main className={shouldHideNavbar ? "min-h-screen" : ""}>
        <Outlet />
      </main>
      <NotificationSystem />
    </div>
  );
}

export default RootLayout;
