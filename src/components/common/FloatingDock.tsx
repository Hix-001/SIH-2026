import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Mic,
  Scale,
  FileText,
  PhoneCall,
  X,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { OFFICIAL_HELPLINES } from '../../utils/constants';

export const FloatingDock: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showSosModal, setShowSosModal] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const dockSections = [
    {
      type: 'item',
      id: 'voice',
      label: 'Voice Triage',
      icon: Mic,
      action: () => navigate('/triage')
    },
    {
      type: 'item',
      id: 'bns',
      label: 'BNS 2023 Directory',
      icon: Scale,
      action: () => navigate('/legal'),
      isActive: location.pathname === '/legal'
    },
    {
      type: 'item',
      id: 'notice',
      label: 'Notice Drafter',
      icon: FileText,
      action: () => navigate('/triage')
    },
    {
      type: 'divider'
    },
    {
      type: 'item',
      id: 'sos',
      label: 'Emergency SOS (1930)',
      icon: PhoneCall,
      action: () => setShowSosModal(true),
      pulse: true
    }
  ];

  return (
    <>
      {/* Mathematically Centered Translucent Floating Dock across all viewports */}
      <div className="fixed bottom-4 sm:bottom-6 inset-x-0 z-40 flex justify-center pointer-events-none px-4">
        <motion.nav
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', damping: 22, stiffness: 260 }}
          className="pointer-events-auto flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full bg-[#060a24]/75 backdrop-blur-2xl border border-white/15 hover:border-gold/30 shadow-[0_20px_50px_rgba(0,0,0,0.7)] transition-colors"
        >
          {dockSections.map((sec, idx) => {
            if (sec.type === 'divider') {
              return (
                <div
                  key={`div-${idx}`}
                  className="w-[1px] h-4 sm:h-5 bg-white/15 mx-0.5 sm:mx-1 shrink-0"
                />
              );
            }

            const item = sec;
            const Icon = item.icon!;
            const isHovered = hoveredIdx === idx;

            return (
              <div
                key={item.id}
                className="relative flex items-center justify-center"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Floating Tooltip Label with Centered Spring Pop-up */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 0, x: '-50%', scale: 0.85 }}
                      animate={{ opacity: 1, y: -50, x: '-50%', scale: 1 }}
                      exit={{ opacity: 0, y: -40, x: '-50%', scale: 0.85 }}
                      transition={{ type: 'spring', damping: 20, stiffness: 380 }}
                      className="absolute left-1/2 top-0 px-2.5 sm:px-3 py-1 rounded-full bg-[#0a1033]/95 text-white text-[11px] sm:text-[12px] font-semibold border border-gold/35 shadow-2xl backdrop-blur-md whitespace-nowrap pointer-events-none z-50 flex items-center justify-center shadow-black/80"
                    >
                      <span>{item.label}</span>
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0a1033] rotate-45 border-r border-b border-gold/35" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Circular Glassmorphic Button */}
                <motion.button
                  whileHover={{ scale: 1.2, y: -4 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: 'spring', damping: 16, stiffness: 320 }}
                  onClick={item.action}
                  className={`relative w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none ${
                    item.isActive
                      ? 'bg-judiciary-800/90 text-gold border border-gold/50 shadow-inner'
                      : item.pulse
                      ? 'bg-red-500/20 text-red-400 hover:bg-red-500/35 border border-red-500/30'
                      : 'bg-[#0d1442]/60 hover:bg-[#1a2366]/80 text-white/90 hover:text-white border border-white/10 hover:border-gold/40 shadow-sm'
                  }`}
                  aria-label={item.label}
                >
                  <Icon className={`w-4.5 h-4.5 sm:w-5 sm:h-5 ${item.pulse ? 'text-red-400' : 'text-white'}`} />
                  
                  {item.pulse && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border border-black"></span>
                    </span>
                  )}
                </motion.button>
              </div>
            );
          })}
        </motion.nav>
      </div>

      {/* SOS Emergency Helplines Modal */}
      <AnimatePresence>
        {showSosModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card w-full max-w-lg rounded-3xl p-5 sm:p-7 border border-red-500/30 shadow-2xl bg-[#0d1442] text-white relative max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center border border-red-500/40">
                    <ShieldAlert className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white leading-tight">
                      Statutory Emergency Helplines
                    </h3>
                    <p className="text-xs text-gray-300">
                      Immediate Indian Government Response Portals
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowSosModal(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 mb-6">
                {Object.values(OFFICIAL_HELPLINES).map((helpline) => (
                  <div
                    key={helpline.number}
                    className="p-4 rounded-2xl bg-judiciary-900/80 border border-white/10 hover:border-gold/30 transition-all flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-extrabold text-gold font-mono">
                          {helpline.number}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-white mt-1">
                        {helpline.title}
                      </h4>
                      <p className="text-[11px] text-gray-300 mt-0.5 leading-relaxed">
                        {helpline.description}
                      </p>
                    </div>

                    <a
                      href={`tel:${helpline.number.replace(/\D/g, '')}`}
                      className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-xs flex items-center gap-1.5 shrink-0 shadow-md transition-all active:scale-95"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Call</span>
                    </a>
                  </div>
                ))}
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 mb-6 leading-relaxed">
                <strong>Golden Hour Warning:</strong> For online UPI, net-banking, or credit card fraud, dial <strong>1930</strong> within 2 hours to initiate a payment gateway lien before funds leave the banking trail.
              </div>

              <button
                onClick={() => setShowSosModal(false)}
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/10 transition-colors"
              >
                Close Emergency SOS
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
export default FloatingDock;
