import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import EmergencyBanner from '../common/EmergencyBanner';
import LegalTicker from '../common/LegalTicker';
import FloatingDock from '../common/FloatingDock';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fe] dark:bg-judiciary-950 text-gray-900 dark:text-gray-100 transition-colors duration-300 relative pb-16">
      <EmergencyBanner />
      <Navbar />
      <LegalTicker />
      <main className="flex-1 w-full">
        {children}
      </main>
      <Footer />
      <FloatingDock />
    </div>
  );
};
export default Layout;
