import React from 'react';
import { Shield, AlertTriangle, Scale, PhoneCall, Globe2, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LegalTicker: React.FC = () => {
  const tickerItems = [
    {
      icon: Scale,
      text: 'BNS Section 316 (Cheating) replaces erstwhile IPC 420 with modernized digital fraud definitions',
      link: '/legal',
      badge: 'BNS 2023',
      badgeColor: 'bg-gold/20 text-gold-deep dark:text-gold border-gold/40'
    },
    {
      icon: PhoneCall,
      text: 'National Cybercrime Helpline 1930: File transaction freeze within Golden Hour for maximum recovery',
      link: '/triage',
      badge: 'SOS 1930',
      badgeColor: 'bg-red-500/20 text-red-700 dark:text-red-400 border-red-500/40'
    },
    {
      icon: Shield,
      text: 'Zero-Knowledge Client-Side PII Redaction Active: Aadhaar, PAN & bank data sanitized before inference',
      link: '/privacy',
      badge: 'DPDP 2023',
      badgeColor: 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border-emerald-500/40'
    },
    {
      icon: FileText,
      text: 'Section 138 NI Act & Tenancy: 15-Day Statutory Notice required before civil/consumer court filing',
      link: '/triage',
      badge: 'Legal Notice',
      badgeColor: 'bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-500/40'
    },
    {
      icon: Globe2,
      text: 'Multilingual Rights Access: Voice Triage supported across 22 Scheduled Indian Languages',
      link: '/triage',
      badge: 'Indic AI',
      badgeColor: 'bg-purple-500/20 text-purple-700 dark:text-purple-400 border-purple-500/40'
    },
    {
      icon: AlertTriangle,
      text: 'Consumer Protection Act 2019: e-Daakhil allows 100% online complaint filing without advocate fees',
      link: '/legal',
      badge: 'Consumer Rights',
      badgeColor: 'bg-amber-500/20 text-amber-700 dark:text-amber-400 border-amber-500/40'
    }
  ];

  return (
    <div className="relative w-full bg-gradient-to-r from-judiciary-950 via-judiciary-900 to-judiciary-950 text-white border-b border-gold/25 py-2 overflow-hidden select-none z-30">
      {/* Live Badge Prefix */}
      <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center gap-1.5 px-3 bg-judiciary-950 border-r border-gold/30 shadow-md">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-gold flex items-center gap-1">
          Live Feed
        </span>
      </div>

      {/* Marquee Content */}
      <div className="flex overflow-hidden group">
        <div className="flex shrink-0 animate-marquee items-center gap-8 pl-28 group-hover:[animation-play-state:paused]">
          {tickerItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={`t1-${index}`}
                to={item.link}
                className="flex items-center gap-2 text-xs text-gray-200 hover:text-gold transition-colors whitespace-nowrap"
              >
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider ${item.badgeColor}`}>
                  {item.badge}
                </span>
                <Icon className="w-3.5 h-3.5 text-gold shrink-0" />
                <span className="font-medium">{item.text}</span>
                <span className="text-gray-600 dark:text-gray-400 ml-4">•</span>
              </Link>
            );
          })}
        </div>

        <div className="flex shrink-0 animate-marquee items-center gap-8 pl-8 group-hover:[animation-play-state:paused]" aria-hidden="true">
          {tickerItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={`t2-${index}`}
                to={item.link}
                className="flex items-center gap-2 text-xs text-gray-200 hover:text-gold transition-colors whitespace-nowrap"
              >
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider ${item.badgeColor}`}>
                  {item.badge}
                </span>
                <Icon className="w-3.5 h-3.5 text-gold shrink-0" />
                <span className="font-medium">{item.text}</span>
                <span className="text-gray-600 dark:text-gray-400 ml-4">•</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default LegalTicker;
