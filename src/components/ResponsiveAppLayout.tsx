import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { Menu } from 'lucide-react';
import NotificationBell from './NotificationBell';

const ResponsiveAppLayout = () => {
  const location = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Notification Bell - Visible on Home and Job Tracker pages */}
      {(location.pathname === '/home' || location.pathname === '/job-tracker' || location.pathname.startsWith('/job-tracker/')) && (
        <div className="fixed top-0 right-0 z-50 p-4 notification-bell-container">
          <NotificationBell key={location.pathname} />
        </div>
      )}
      
      <div className="flex flex-1 pt-16">
        <div className="hamburger-menu" onClick={toggleDrawer}>
          <Menu size={24} />
        </div>

        <div className={`slide-out-drawer ${isDrawerOpen ? 'open' : ''}`}>
          <Sidebar isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
        </div>

        {isDrawerOpen && <div className="overlay open" onClick={toggleDrawer}></div>}

        <div className="sidebar-container fixed-sidebar">
          <Sidebar isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
        </div>

        <main className="main-content flex-1">
          <div className="p-4">
            <Outlet />
          </div>
          {location.pathname === '/' && <Footer />}
        </main>
      </div>
    </div>
  );
};
export default ResponsiveAppLayout;
