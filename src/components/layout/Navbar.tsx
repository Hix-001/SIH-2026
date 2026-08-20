import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Scale, Menu, X } from 'lucide-react';
import LanguageSelector from '../common/LanguageSelector';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Legal Triage', path: '/triage' },
    { name: 'BNS 2023 Acts', path: '/legal' },
    { name: 'About & SIH 2026', path: '/about' },
    { name: 'Privacy Guarantee', path: '/privacy' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 w-full h-[74px] backdrop-blur-xl bg-[#060a24]/90 border-b border-judiciary-800/70 shadow-lg shadow-black/20 transition-all flex items-center">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        
        {/* 1. Left Edge: Brand Logo & Title */}
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <img
            src="/logo.png"
            alt="Nyaya Setu Emblem"
            className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 object-contain drop-shadow-[0_4px_14px_rgba(212,175,55,0.3)] group-hover:scale-105 transition-transform duration-300"
          />
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-bold text-white tracking-wide font-serif leading-tight">
                Nyaya <span className="text-gold">Setu</span>
              </span>
              <span className="inline-flex items-center text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-judiciary-900 text-gold border border-gold/40 shadow-sm leading-normal">
                SIH 2026
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] text-gray-400 font-medium tracking-widest uppercase">
              Justice Bridge
            </span>
          </div>
        </Link>

        {/* 2. Middle: 4 Main Links Spread Widely Across the Navbar */}
        <nav className="hidden lg:flex flex-1 max-w-2xl xl:max-w-3xl mx-8 xl:mx-16 justify-between items-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                isActive(link.path)
                  ? 'text-gold bg-judiciary-900/90 shadow-sm border border-gold/30'
                  : 'text-gray-300 hover:text-gold hover:bg-judiciary-900/40'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* 3. Extreme Right Edge: Language Dropdown + Launch Triage Button */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Language Selector */}
          <LanguageSelector />

          {/* Quick Triage CTA */}
          <Link
            to="/triage"
            className="hidden sm:inline-flex items-center gap-2 h-10 px-5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-judiciary-800 to-judiciary-700 hover:from-judiciary-900 hover:to-judiciary-800 shadow-md hover:shadow-lg transition-all border border-gold/35 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Scale className="w-4 h-4 text-gold" />
            <span>Launch Triage</span>
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden h-10 w-10 flex items-center justify-center rounded-xl border border-judiciary-800 bg-judiciary-900 text-gray-200"
            aria-label="Open mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#060a24] border-b border-judiciary-800 px-5 pt-3 pb-6 space-y-2 shadow-2xl">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                isActive(link.path)
                  ? 'text-gold bg-judiciary-900 border border-gold/30'
                  : 'text-gray-300 hover:bg-judiciary-900/50'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              to="/triage"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-judiciary-800 to-judiciary-700 shadow-md border border-gold/30"
            >
              <Scale className="w-4 h-4 text-gold" />
              <span>Start Legal Triage</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
export default Navbar;
