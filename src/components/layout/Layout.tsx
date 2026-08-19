import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import EmergencyBanner from '../common/EmergencyBanner';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fe] dark:bg-judiciary-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <EmergencyBanner />
      <Navbar />
      <main className="flex-1 w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
};
export default Layout;
