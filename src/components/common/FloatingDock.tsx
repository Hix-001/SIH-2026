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
      {/* Floating Translucent Glassmorphic Dock */}
      <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40">
        <motion.nav
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', damping: 22, stiffness: 260 }}
          className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full bg-[#060a24]/65 backdrop-blur-2xl border border-white/15 hover:border-gold/30 shadow-[0_20px_50px_rgba(0,0,0,0.65)] transition-colors"
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
              transition={{ type: 'spring', damping: 20, stiffness: 280 }}
              className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#060a24] text-white rounded-2xl sm:rounded-3xl border border-red-500/40 shadow-2xl p-4 sm:p-6 relative"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-judiciary-800">
                <div className="flex items-center gap-2.5 text-red-400 font-bold text-lg">
                  <ShieldAlert className="w-6 h-6" />
                  <span>National Emergency Legal Helplines</span>
                </div>
                <button
                  onClick={() => setShowSosModal(false)}
                  className="p-1.5 rounded-full hover:bg-judiciary-800 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Helplines Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-5">
                {Object.entries(OFFICIAL_HELPLINES).map(([key, h]) => (
                  <div
                    key={key}
                    className="p-3.5 rounded-2xl bg-judiciary-900/80 border border-judiciary-800 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                          {key.replace('_', ' ')}
                        </span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-950 text-red-300 border border-red-800/40">
                          24x7 Active
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white">
                        {h.title}
                      </h4>
                      <p className="text-xs text-gray-300 mt-1">
                        {h.description}
                      </p>
                    </div>

                    <a
                      href={`tel:${h.number.replace(/[^0-9]/g, '')}`}
                      className="mt-3 flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md transition-colors"
                    >
                      <PhoneCall className="w-4 h-4" />
                      <span>Call {h.number}</span>
                    </a>
                  </div>
                ))}
              </div>

              {/* Triage Redirect CTA */}
              <div className="pt-3 border-t border-judiciary-800 flex items-center justify-between">
                <span className="text-xs text-gray-400">
                  Need customized legal clauses for your FIR/Notice?
                </span>
                <button
                  onClick={() => {
                    setShowSosModal(false);
                    navigate('/triage');
                  }}
                  className="flex items-center gap-1.5 text-xs font-bold text-gold hover:underline"
                >
                  <span>Start Legal Triage</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
export default FloatingDock;
