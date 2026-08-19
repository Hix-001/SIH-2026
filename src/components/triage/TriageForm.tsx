import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Scale, ArrowRight, ShieldCheck, AlertCircle, Sparkles, MapPin, IndianRupee, Calendar } from 'lucide-react';
import { useTriage } from '../../context/TriageContext';
import { CATEGORY_METADATA } from '../../utils/constants';
import { LegalCategory, TriageFormData } from '../../types/legal.types';
import { redactPII } from '../../utils/piiRedactor';

export const TriageForm: React.FC = () => {
  const navigate = useNavigate();
  const { currentForm, updateFormField, runAnalysis, isAnalyzing } = useTriage();

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<TriageFormData>({
    defaultValues: currentForm
  });

  const queryWatch = watch('query', currentForm.query);
  const piiRedaction = redactPII(queryWatch || '');

  const categories = Object.entries(CATEGORY_METADATA) as [LegalCategory, typeof CATEGORY_METADATA[LegalCategory]][];

  const onSubmit = async (data: TriageFormData) => {
    if (!data.query || data.query.trim().length < 15) {
      toast.error('Please describe your dispute with at least 15 characters for accurate analysis.');
      return;
    }

    try {
      const result = await runAnalysis(data);
      toast.success('Legal triage and statutory analysis complete!');
      navigate('/results');
    } catch (err) {
      toast.error('Failed to complete analysis. Please try again.');
    }
  };

  const handleCategorySelect = (catKey: LegalCategory) => {
    setValue('categoryHint', catKey);
    updateFormField('categoryHint', catKey);
    if (!queryWatch || queryWatch.trim().length === 0) {
      const sample = CATEGORY_METADATA[catKey].samplePrompt;
      setValue('query', sample);
      updateFormField('query', sample);
    }
  };

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-judiciary-800 shadow-xl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Category Quick Chips */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-judiciary-900 dark:text-gold mb-3 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Select Dispute Category (Optional Pre-Filter)
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map(([key, meta]) => {
              const isSelected = watch('categoryHint') === key;
              return (
                <button
                  type="button"
                  key={key}
                  onClick={() => handleCategorySelect(key)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    isSelected
                      ? 'bg-judiciary-800 text-white border-judiciary-800 shadow-md font-semibold dark:bg-gold dark:text-judiciary-950'
                      : 'bg-white/80 dark:bg-judiciary-900/60 border-gray-200 dark:border-judiciary-800 text-gray-700 dark:text-gray-300 hover:border-judiciary-500'
                  }`}
                >
                  {meta.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Textarea */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 dark:text-gray-200">
              Describe Your Legal Issue in Detail <span className="text-secondary">*</span>
            </label>
            {piiRedaction.piiCount > 0 && (
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800/60 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                {piiRedaction.piiCount} PII elements detected & sanitized
              </span>
            )}
          </div>

          <div className="relative">
            <textarea
              {...register('query', {
                required: 'Please describe the dispute facts',
                minLength: { value: 15, message: 'Minimum 15 characters required' }
              })}
              onChange={(e) => {
                setValue('query', e.target.value);
                updateFormField('query', e.target.value);
              }}
              rows={6}
              placeholder="e.g., My landlord in Bengaluru has refused to return my security deposit of ₹75,000 even after vacating 45 days ago without any damages..."
              className="w-full p-4 rounded-2xl border border-gray-300 dark:border-judiciary-700 bg-white dark:bg-judiciary-900 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:border-judiciary-700 dark:focus:border-gold transition-colors leading-relaxed"
            />
          </div>
          {errors.query && (
            <p className="text-xs text-red-500 font-semibold mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.query.message}
            </p>
          )}
        </div>

        {/* Extra Dispute Metadata (Amount, Date, Location) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          {/* Dispute Amount */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 flex items-center gap-1">
              <IndianRupee className="w-3.5 h-3.5 text-gold" />
              Disputed Amount (INR)
            </label>
            <input
              type="text"
              {...register('disputeAmount')}
              onChange={(e) => {
                setValue('disputeAmount', e.target.value);
                updateFormField('disputeAmount', e.target.value);
              }}
              placeholder="e.g. ₹75,000"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-judiciary-700 bg-white dark:bg-judiciary-900 text-xs sm:text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:border-gold"
            />
          </div>

          {/* Incident Date */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-gold" />
              Incident / Notice Date
            </label>
            <input
              type="date"
              {...register('incidentDate')}
              onChange={(e) => {
                setValue('incidentDate', e.target.value);
                updateFormField('incidentDate', e.target.value);
              }}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-judiciary-700 bg-white dark:bg-judiciary-900 text-xs sm:text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:border-gold"
            />
          </div>

          {/* Jurisdiction / State */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-gold" />
              City & State (Jurisdiction)
            </label>
            <input
              type="text"
              {...register('stateOrCity')}
              onChange={(e) => {
                setValue('stateOrCity', e.target.value);
                updateFormField('stateOrCity', e.target.value);
              }}
              placeholder="e.g. Bengaluru, Karnataka"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-judiciary-700 bg-white dark:bg-judiciary-900 text-xs sm:text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:border-gold"
            />
          </div>
        </div>

        {/* Submit CTA */}
        <div className="pt-4 border-t border-gray-200 dark:border-judiciary-800 flex items-center justify-between gap-4">
          <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>100% Confidential • Zero-Knowledge PII Scrubbing</span>
          </div>

          <motion.button
            type="submit"
            disabled={isAnalyzing}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-judiciary-800 to-judiciary-700 hover:from-judiciary-900 hover:to-judiciary-800 text-white font-bold text-sm shadow-lg flex items-center gap-2 border border-gold/30 disabled:opacity-50"
          >
            <Scale className="w-4 h-4 text-gold" />
            <span>Run Legal Triage Analysis</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </form>
    </div>
  );
};
export default TriageForm;
