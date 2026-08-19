import React, { useState } from 'react';
import { CheckCircle2, Circle, Clock, ArrowUpRight, ShieldCheck, AlertCircle, FileCheck } from 'lucide-react';
import { ActionStep } from '../../types/legal.types';
import confetti from 'canvas-confetti';
import toast from 'react-hot-toast';

interface ActionableStepsProps {
  steps: ActionStep[];
}

export const ActionableSteps: React.FC<ActionableStepsProps> = ({ steps }) => {
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  const toggleComplete = (stepId: string) => {
    setCompletedSteps(prev => {
      const isNowCompleted = !prev[stepId];
      const updated = { ...prev, [stepId]: isNowCompleted };
      
      if (isNowCompleted) {
        toast.success('Step marked as completed!');
        // Check if all completed
        const total = steps.length;
        const count = Object.values(updated).filter(Boolean).length;
        if (count === total) {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
          toast.success('Congratulations! You completed all legal actionable steps!');
        }
      }
      return updated;
    });
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'immediate':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 border border-red-300">Immediate Action</span>;
      case 'within_24h':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-300">Within 24 Hours</span>;
      case 'within_7_days':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-300">Within 7 Days</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300">Standard Timeline</span>;
    }
  };

  const completedCount = Object.values(completedSteps).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-judiciary-900 dark:text-white flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-gold" />
            Step-by-Step Citizen Action Plan
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Strict procedural order required to preserve rights and satisfy statutory prerequisites
          </p>
        </div>

        {/* Progress Pill */}
        <div className="flex items-center gap-3 bg-white dark:bg-judiciary-900 p-2.5 px-4 rounded-2xl border border-gray-200 dark:border-judiciary-800 shadow-sm">
          <div className="text-xs font-bold text-judiciary-900 dark:text-gold">
            {completedCount}/{steps.length} Steps Done ({progressPercent}%)
          </div>
          <div className="w-24 h-2 bg-gray-200 dark:bg-judiciary-950 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-gold to-accent transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {steps.map((step) => {
          const isDone = !!completedSteps[step.id];

          return (
            <div
              key={step.id}
              className={`glass-card rounded-3xl p-6 border transition-all ${
                isDone
                  ? 'border-emerald-300 dark:border-emerald-900/60 bg-emerald-50/30 dark:bg-emerald-950/20 opacity-90'
                  : 'border-gray-200 dark:border-judiciary-800 hover:shadow-md'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Checkbox */}
                <button
                  onClick={() => toggleComplete(step.id)}
                  className="mt-1 flex-shrink-0 text-gray-400 hover:text-emerald-500 transition-colors"
                  aria-label={isDone ? 'Mark uncompleted' : 'Mark completed'}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  ) : (
                    <Circle className="w-6 h-6" />
                  )}
                </button>

                {/* Content */}
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-md bg-judiciary-800 text-white dark:bg-gold dark:text-judiciary-950 font-mono">
                        Step {step.stepNumber}
                      </span>
                      {getUrgencyBadge(step.urgency)}
                    </div>
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {step.timeline}
                    </span>
                  </div>

                  <h3 className={`text-base font-bold ${isDone ? 'line-through text-gray-500' : 'text-judiciary-900 dark:text-white'}`}>
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Evidence Required */}
                  {step.evidenceRequired && step.evidenceRequired.length > 0 && (
                    <div className="p-3 rounded-xl bg-gray-50 dark:bg-judiciary-950/70 border border-gray-200 dark:border-judiciary-800 text-xs">
                      <span className="font-bold text-judiciary-800 dark:text-gold block mb-1">
                        Evidence / Documents to Keep Ready:
                      </span>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {step.evidenceRequired.map((ev, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded bg-white dark:bg-judiciary-900 border border-gray-200 dark:border-judiciary-700 text-gray-700 dark:text-gray-300 text-[11px]"
                          >
                            ✓ {ev}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Authority Link & Practical Tips */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-gray-100 dark:border-judiciary-800/80 text-xs">
                    <div className="text-gray-500 dark:text-gray-400">
                      Authority: <strong className="text-gray-800 dark:text-gray-200">{step.authorityName}</strong>
                    </div>

                    {step.authorityUrl && (
                      <a
                        href={step.authorityUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-judiciary-800 dark:text-gold font-bold flex items-center gap-1 hover:underline"
                      >
                        <span>Official Portal</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ActionableSteps;
