import React from 'react';
import { Scale, Users, FileCheck, ShieldAlert, Award } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const stats = [
    {
      value: '1.4B+',
      label: 'Indian Citizens Empowered',
      subtext: 'Equal constitutional access under Article 39A',
      icon: Users
    },
    {
      value: '358+',
      label: 'BNS 2023 Sections Codified',
      subtext: 'With IPC legacy cross-reference index',
      icon: Scale
    },
    {
      value: '22',
      label: 'Official Indic Languages',
      subtext: 'Bhashini AI pipeline ready',
      icon: FileCheck
    },
    {
      value: '< 2 Sec',
      label: 'Real-Time Triage Speed',
      subtext: 'Zero-knowledge client-side privacy',
      icon: ShieldAlert
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-judiciary-950 via-judiciary-900 to-judiciary-950 text-white border-y border-gold/20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-gold mb-3 border border-gold/30">
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gold via-accent to-gold-light font-mono">
                {stat.value}
              </div>
              <div className="text-sm font-bold text-white mt-1">
                {stat.label}
              </div>
              <div className="text-xs text-gray-400 mt-0.5">
                {stat.subtext}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default StatsSection;
