import React, { useState } from 'react';
import { PhoneCall, ShieldAlert, X, ExternalLink, AlertCircle } from 'lucide-react';
import { OFFICIAL_HELPLINES } from '../../utils/constants';

export const EmergencyBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-judiciary-950 via-secondary-dark to-judiciary-900 text-white text-xs py-2 px-4 shadow-inner relative z-50 border-b border-red-500/30">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-medium">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span className="font-bold tracking-wide text-gold">EMERGENCY LEGAL HELPLINES:</span>
          <span className="hidden md:inline text-gray-200">
            For active financial fraud, report immediately to freeze bank accounts.
          </span>
        </div>

        <div className="flex items-center flex-wrap gap-4 sm:gap-6 font-semibold">
          <a
            href={`tel:${OFFICIAL_HELPLINES.CYBER_FRAUD.number}`}
            className="flex items-center gap-1.5 hover:text-gold transition-colors underline-offset-2 hover:underline"
            title={OFFICIAL_HELPLINES.CYBER_FRAUD.title}
          >
            <PhoneCall className="w-3.5 h-3.5 text-red-400" />
            <span>Cyber Fraud: {OFFICIAL_HELPLINES.CYBER_FRAUD.number}</span>
          </a>

          <a
            href={`tel:${OFFICIAL_HELPLINES.CONSUMER.number}`}
            className="flex items-center gap-1.5 hover:text-gold transition-colors underline-offset-2 hover:underline"
            title={OFFICIAL_HELPLINES.CONSUMER.title}
          >
            <PhoneCall className="w-3.5 h-3.5 text-accent" />
            <span>Consumer Helpline: {OFFICIAL_HELPLINES.CONSUMER.number}</span>
          </a>

          <a
            href={`tel:${OFFICIAL_HELPLINES.LEGAL_AID.number}`}
            className="hidden lg:flex items-center gap-1.5 hover:text-gold transition-colors underline-offset-2 hover:underline"
            title={OFFICIAL_HELPLINES.LEGAL_AID.title}
          >
            <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
            <span>Free Legal Aid: {OFFICIAL_HELPLINES.LEGAL_AID.number}</span>
          </a>

          <button
            onClick={() => setIsVisible(false)}
            className="p-1 hover:bg-white/10 rounded-full transition-colors ml-1 text-gray-300 hover:text-white"
            aria-label="Dismiss Emergency Banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default EmergencyBanner;
