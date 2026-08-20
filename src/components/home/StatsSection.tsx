import React from 'react';
import { Scale, Users, FileCheck, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <section className="py-20 bg-gradient-to-r from-[#040618] via-[#091038] to-[#040618] text-white border-y border-gold/25 relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gold/[0.03] blur-2xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="flex flex-col items-center text-center p-5 rounded-3xl bg-[#060a24]/60 backdrop-blur-xl border border-judiciary-800/80 hover:border-gold/40 transition-all shadow-lg hover:shadow-gold/10 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-judiciary-900/90 flex items-center justify-center text-gold mb-3.5 border border-gold/35 group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-md">
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gold via-accent to-gold-light font-mono tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm font-bold text-white mt-1.5 group-hover:text-gold transition-colors">
                {stat.label}
              </div>
              <div className="text-xs text-gray-300 mt-1 leading-relaxed">
                {stat.subtext}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default StatsSection;
