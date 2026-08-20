import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import EmergencyBanner from '../common/EmergencyBanner';
import LegalTicker from '../common/LegalTicker';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#060a24] text-gray-100 relative">
      <EmergencyBanner />
      <Navbar />
      <LegalTicker />
      <main className="flex-1 w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
};
export default Layout;
