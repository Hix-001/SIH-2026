import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Scale, Menu, X, Globe, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSelector from '../common/LanguageSelector';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

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
    <>
      <header className="sticky top-0 z-40 w-full h-[74px] backdrop-blur-2xl bg-[#060a24]/95 border-b border-judiciary-800/80 shadow-lg shadow-black/30">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          
          {/* 1. Left Edge: Brand Logo & Title (Clean on Mobile without Bio) */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3.5 group shrink-0">
            <img
              src="/logo.png"
              alt="Nyaya Setu Emblem"
              className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 object-contain drop-shadow-[0_4px_14px_rgba(212,175,55,0.35)] group-hover:scale-105 transition-transform duration-300"
            />
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-bold text-white tracking-wide font-serif leading-none">
                  Nyaya <span className="text-gold">Setu</span>
                </span>
                <span className="inline-flex items-center text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-judiciary-900 text-gold border border-gold/40 shadow-sm leading-normal">
                  SIH 2026
                </span>
              </div>
              {/* Bio: Hidden on mobile per user specification, visible on tablet/desktop */}
              <span className="hidden md:block text-[10px] sm:text-[11px] text-gray-400 font-medium tracking-widest uppercase mt-0.5">
                Justice Bridge
              </span>
            </div>
          </Link>

          {/* 2. Middle: Desktop Navigation Links */}
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

          {/* 3. Right Edge: Desktop Controls + Mobile Hamburger Menu */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Desktop Language Selector */}
            <div className="hidden lg:block">
              <LanguageSelector />
            </div>

            {/* Desktop Launch Triage CTA */}
            <Link
              to="/triage"
              className="hidden sm:inline-flex items-center gap-2 h-10 px-5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-judiciary-800 to-judiciary-700 hover:from-judiciary-900 hover:to-judiciary-800 shadow-md hover:shadow-lg transition-all border border-gold/35 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Scale className="w-4 h-4 text-gold" />
              <span>Launch Triage</span>
            </Link>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden h-11 w-11 flex items-center justify-center rounded-2xl border border-judiciary-700 bg-judiciary-900/90 text-gold hover:bg-judiciary-800 active:scale-95 transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-gold/40"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-gold" /> : <Menu className="w-6 h-6 text-gold" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu (Fixed overlay with dark backdrop & translucent glass UI) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Dark Dimmed Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 top-[74px] z-40 bg-black/75 backdrop-blur-md lg:hidden"
            />

            {/* Translucent Glass Drawer Menu matching Dock aesthetic */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 320 }}
              className="fixed top-[74px] inset-x-0 z-50 lg:hidden bg-[#060a24]/95 backdrop-blur-2xl border-b border-gold/35 shadow-[0_25px_60px_rgba(0,0,0,0.9)] max-h-[calc(100vh-74px)] overflow-y-auto"
            >
              <div className="px-5 py-6 space-y-4 max-w-lg mx-auto">
                
                {/* Navigation Links with Glass Pill Styling */}
                <div className="space-y-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-4 py-3.5 rounded-2xl text-base font-semibold transition-all ${
                        isActive(link.path)
                          ? 'text-gold bg-judiciary-900/90 border border-gold/40 shadow-inner'
                          : 'text-gray-200 hover:text-white bg-[#0d1442]/60 hover:bg-[#1a2366]/80 border border-white/10'
                      }`}
                    >
                      <span>{link.name}</span>
                      {isActive(link.path) && (
                        <span className="w-2 h-2 rounded-full bg-gold shadow-sm shadow-gold" />
                      )}
                    </Link>
                  ))}
                </div>

                {/* Language Selector in Glass Box */}
                <div className="p-3.5 rounded-2xl bg-[#0d1442]/60 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-200 uppercase tracking-wider">
                    <Globe className="w-4 h-4 text-gold" />
                    <span>Choose Language</span>
                  </div>
                  <LanguageSelector />
                </div>

                {/* Primary Action Button */}
                <div className="pt-1">
                  <Link
                    to="/triage"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-judiciary-800 via-judiciary-700 to-judiciary-800 shadow-lg shadow-gold/15 border border-gold/40 active:scale-[0.98] transition-transform"
                  >
                    <Scale className="w-5 h-5 text-gold" />
                    <span>Start Legal Triage Now</span>
                  </Link>
                </div>

                {/* Quick SOS Helpline Link */}
                <div className="pt-2 text-center">
                  <a
                    href="tel:1930"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-400 hover:text-red-300 transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>National Cyber Fraud SOS: Dial 1930</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
export default Navbar;
