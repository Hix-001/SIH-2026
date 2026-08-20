import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Mic,
  Scale,
  FileText,
  PhoneCall,
  Moon,
  Sun,
  X,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { OFFICIAL_HELPLINES } from '../../utils/constants';

export const FloatingDock: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const [showSosModal, setShowSosModal] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const dockItems = [
    {
      id: 'voice',
      label: 'Voice Triage',
      icon: Mic,
      color: 'from-amber-500 to-red-500',
      action: () => navigate('/triage')
    },
    {
      id: 'bns',
      label: 'BNS 2023 Lookup',
      icon: Scale,
      color: 'from-blue-600 to-indigo-600',
      action: () => navigate('/legal'),
      isActive: location.pathname === '/legal'
    },
    {
      id: 'notice',
      label: 'Demand Notice',
      icon: FileText,
      color: 'from-emerald-600 to-teal-600',
      action: () => navigate('/triage')
    },
    {
      id: 'sos',
      label: 'Emergency SOS',
      icon: PhoneCall,
      color: 'from-red-600 to-rose-700',
      action: () => setShowSosModal(true),
      pulse: true
    },
    {
      id: 'theme',
      label: isDark ? 'Light Mode' : 'Dark Mode',
      icon: isDark ? Sun : Moon,
      color: 'from-gray-700 to-gray-900 dark:from-gray-800 dark:to-gray-950',
      action: toggleTheme
    }
  ];

  return (
    <>
      {/* Floating Bottom Dock */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', damping: 20, stiffness: 200 }}
          className="flex items-center gap-2 p-2 px-3.5 rounded-full bg-judiciary-950/85 dark:bg-judiciary-950/90 backdrop-blur-2xl border border-gold/40 shadow-2xl shadow-judiciary-950/40"
        >
          {dockItems.map((item, idx) => {
            const Icon = item.icon;
            const isHovered = hoveredIdx === idx;

            return (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Tooltip Label */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.85 }}
                      animate={{ opacity: 1, y: -45, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.85 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-1/2 -translate-x-1/2 -top-2 px-2.5 py-1 rounded-lg bg-judiciary-900 text-white border border-gold/40 text-[11px] font-semibold whitespace-nowrap shadow-lg pointer-events-none z-50 flex items-center gap-1.5"
                    >
                      <span>{item.label}</span>
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-judiciary-900 rotate-45 border-r border-b border-gold/40" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Dock Button */}
                <motion.button
                  whileHover={{ scale: 1.25, y: -4 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={item.action}
                  className={`relative p-2.5 sm:p-3 rounded-full text-white bg-gradient-to-br ${item.color} shadow-md transition-shadow hover:shadow-gold/30 hover:shadow-lg focus:outline-none flex items-center justify-center`}
                  aria-label={item.label}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  {item.pulse && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border border-white"></span>
                    </span>
                  )}
                </motion.button>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* SOS Emergency Helplines Modal */}
      <AnimatePresence>
        {showSosModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-lg bg-white dark:bg-judiciary-950 rounded-3xl border-2 border-red-500/40 shadow-2xl p-6 relative overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-judiciary-800">
                <div className="flex items-center gap-2.5 text-red-600 dark:text-red-400 font-bold text-lg">
                  <ShieldAlert className="w-6 h-6" />
                  <span>National Emergency Legal Helplines</span>
                </div>
                <button
                  onClick={() => setShowSosModal(false)}
                  className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-judiciary-800 text-gray-400 hover:text-gray-700 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Helplines Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-5">
                {Object.entries(OFFICIAL_HELPLINES).map(([key, h]) => (
                  <div
                    key={key}
                    className="p-3.5 rounded-2xl bg-gray-50 dark:bg-judiciary-900/60 border border-gray-200 dark:border-judiciary-800 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                          {key.replace('_', ' ')}
                        </span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300">
                          24x7 Active
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                        {h.title}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
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
              <div className="pt-3 border-t border-gray-200 dark:border-judiciary-800 flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Need customized legal clauses for your FIR/Notice?
                </span>
                <button
                  onClick={() => {
                    setShowSosModal(false);
                    navigate('/triage');
                  }}
                  className="flex items-center gap-1.5 text-xs font-bold text-judiciary-700 dark:text-gold hover:underline"
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
