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
    <header className="sticky top-0 z-40 w-full backdrop-blur-2xl bg-[#060a24]/95 border-b border-judiciary-800/90 shadow-2xl shadow-black/40 transition-all">
      <div className="w-full max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 min-h-[84px] py-3.5 flex items-center justify-between gap-6">
        
        {/* 1. Left Edge: Brand Logo & Title */}
        <Link to="/" className="flex items-center gap-3.5 group shrink-0">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-judiciary-800 to-judiciary-950 border border-gold/50 flex items-center justify-center shadow-lg group-hover:scale-105 group-hover:border-gold transition-all duration-300 p-1">
            <img src="/logo.png" alt="NyayaSetu Emblem" className="w-10 h-10 object-contain" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-extrabold text-white tracking-tight font-sans">
                Nyaya<span className="text-gold">Setu</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-md bg-judiciary-900 text-gold border border-gold/40 shadow-sm">
                SIH 2026
              </span>
            </div>
            <span className="text-xs text-gray-400 font-medium tracking-wide">
              Citizen Legal Triage & Rights Navigator
            </span>
          </div>
        </Link>

        {/* 2. Middle: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-judiciary-950/60 border border-judiciary-800/80 shadow-inner">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                isActive(link.path)
                  ? 'text-gold bg-judiciary-900 shadow-md border border-gold/30'
                  : 'text-gray-300 hover:text-gold hover:bg-judiciary-900/50'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* 3. Extreme Right Edge: Language Dropdown + Launch Triage Button */}
        <div className="flex items-center gap-3.5 shrink-0">
          {/* Language Selector */}
          <LanguageSelector />

          {/* Quick Triage CTA */}
          <Link
            to="/triage"
            className="hidden sm:inline-flex items-center gap-2.5 h-11 px-6 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-judiciary-800 via-judiciary-700 to-judiciary-800 hover:from-judiciary-900 hover:to-judiciary-800 shadow-lg shadow-judiciary-950/50 hover:shadow-gold/15 transition-all duration-300 border border-gold/45 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Scale className="w-4 h-4 text-gold" />
            <span>Launch Triage</span>
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden h-11 w-11 flex items-center justify-center rounded-xl border border-judiciary-800 bg-judiciary-900 text-gray-200 hover:text-white"
            aria-label="Open mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#060a24] border-b border-judiciary-800 px-6 pt-4 pb-7 space-y-3 shadow-2xl">
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
              className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-judiciary-800 to-judiciary-700 shadow-lg border border-gold/30"
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
