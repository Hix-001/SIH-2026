import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SAMPLE_SCENARIOS } from '../../utils/constants';
import { useTriage } from '../../context/TriageContext';
import { ArrowRight, Scale, ShieldAlert, ShoppingBag, CreditCard, Sparkles } from 'lucide-react';
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
        return <Scale className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case 'online_financial_fraud':
        return <ShieldAlert className="w-5 h-5 text-red-600 dark:text-red-400" />;
      case 'consumer_deficiency':
        return <ShoppingBag className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      default:
        return <CreditCard className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
    }
  };

  return (
    <section className="py-20 bg-gray-50/70 dark:bg-judiciary-900/40 border-y border-gray-200 dark:border-judiciary-800 transition-colors">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-judiciary-800 dark:text-gold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Presentation Ready Test Cases
            </div>
            <h2 className="text-3xl font-extrabold text-judiciary-900 dark:text-white">
              Everyday Citizen Legal Scenarios
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Select any real-world dispute below to instantly evaluate the complete triage engine, statutory mappings, and notice drafts.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SAMPLE_SCENARIOS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card rounded-3xl p-6 border border-gray-200 dark:border-judiciary-800 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-judiciary-800 flex items-center justify-center">
                    {getCategoryIcon(item.category)}
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-judiciary-50 dark:bg-judiciary-900 text-judiciary-800 dark:text-gold border border-gold/30">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-base font-bold text-judiciary-900 dark:text-white mb-2 group-hover:text-judiciary-700 dark:group-hover:text-gold transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  {item.preview}
                </p>
              </div>

              <button
                onClick={() => handleLaunchPreset(item.query, item.category)}
                className="w-full py-2.5 px-4 rounded-xl bg-judiciary-800 hover:bg-judiciary-900 dark:bg-judiciary-800 dark:hover:bg-judiciary-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all group-hover:bg-gold group-hover:text-judiciary-950"
              >
                <span>Run Triage Test</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default PresetScenariosSection;
