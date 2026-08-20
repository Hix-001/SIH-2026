import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SAMPLE_SCENARIOS } from '../../utils/constants';
import { useTriage } from '../../context/TriageContext';
import { ArrowRight, Scale, ShieldAlert, ShoppingBag, CreditCard, Sparkles, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export const PresetScenariosSection: React.FC = () => {
  const navigate = useNavigate();
  const { updateFormField } = useTriage();

  const handleLaunchPreset = (query: string, categoryHint: any) => {
    updateFormField('query', query);
    updateFormField('categoryHint', categoryHint);
    navigate('/triage');
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'property_landlord_dispute':
        return <Scale className="w-5 h-5 text-amber-400" />;
      case 'online_financial_fraud':
        return <ShieldAlert className="w-5 h-5 text-red-400" />;
      case 'consumer_deficiency':
        return <ShoppingBag className="w-5 h-5 text-blue-400" />;
      default:
        return <CreditCard className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <section className="py-24 bg-[#05081c] border-y border-judiciary-800/80 text-white relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-judiciary-900/40 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between mb-14 gap-4"
        >
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold mb-3 px-3 py-1 bg-judiciary-900 rounded-full border border-gold/30">
              <Zap className="w-3.5 h-3.5" />
              <span>Presentation Ready Test Cases</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-sans tracking-tight">
              Everyday Citizen Legal Scenarios
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select any real-world dispute below to instantly evaluate the complete triage engine, statutory mappings, and notice drafts.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SAMPLE_SCENARIOS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="p-6 rounded-3xl bg-[#0a1033]/80 backdrop-blur-xl border border-judiciary-800 hover:border-gold/50 shadow-xl hover:shadow-2xl hover:shadow-gold/10 flex flex-col justify-between transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-judiciary-900 border border-judiciary-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getCategoryIcon(item.category)}
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-md bg-judiciary-950 text-gold border border-gold/20">
                    {item.category.replace(/_/g, ' ')}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2 group-hover:text-gold transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed line-clamp-3">
                  "{item.query}"
                </p>
              </div>

              <div className="pt-6 border-t border-judiciary-800/80 mt-6">
                <button
                  onClick={() => handleLaunchPreset(item.query, item.category)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-judiciary-900 hover:bg-judiciary-800 text-white font-bold text-xs border border-judiciary-700 hover:border-gold/50 transition-all shadow-md group/btn"
                >
                  <span>Evaluate Scenario</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gold group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default PresetScenariosSection;
