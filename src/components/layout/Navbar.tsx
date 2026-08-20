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
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#060a24]/90 border-b border-judiciary-800/80 transition-colors">
      <div className="container mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-judiciary-800 to-judiciary-900 border border-gold/40 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <img src="/logo.png" alt="NyayaSetu Emblem" className="w-9 h-9 object-contain" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold text-white tracking-tight font-sans">
                Nyaya<span className="text-gold">Setu</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-judiciary-900 text-gold border border-gold/30">
                SIH 2026
              </span>
            </div>
            <span className="text-[11px] text-gray-400 font-medium">
              Citizen Legal Triage & Rights Navigator
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                isActive(link.path)
                  ? 'text-gold bg-judiciary-900/90 shadow-sm border border-gold/20'
                  : 'text-gray-300 hover:text-gold hover:bg-judiciary-900/40'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <LanguageSelector />

          {/* Quick Triage CTA */}
          <Link
            to="/triage"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-judiciary-800 to-judiciary-700 hover:from-judiciary-900 hover:to-judiciary-800 shadow-md hover:shadow-lg transition-all border border-gold/30 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Scale className="w-4 h-4 text-gold" />
            <span>Launch Triage</span>
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl border border-judiciary-800 text-gray-200"
            aria-label="Open mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#060a24] border-b border-judiciary-800 px-4 pt-3 pb-6 space-y-2 shadow-2xl">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                isActive(link.path)
                  ? 'text-gold bg-judiciary-900 border border-gold/20'
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
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-judiciary-800 to-judiciary-700 shadow-md"
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
