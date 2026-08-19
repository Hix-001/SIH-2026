import React, { useState } from 'react';
import { FileText, Download, Copy, Printer, Check, Edit3, ShieldAlert, Sparkles, Plus, Trash2 } from 'lucide-react';
import { LegalNoticeData } from '../../types/legal.types';
import { PDFGeneratorService } from '../../services/pdfGenerator';
import { copyToClipboard } from '../../utils/helpers';
import toast from 'react-hot-toast';

interface LegalNoticeGeneratorProps {
  initialNotice: LegalNoticeData;
}

export const LegalNoticeGenerator: React.FC<LegalNoticeGeneratorProps> = ({ initialNotice }) => {
  const [notice, setNotice] = useState<LegalNoticeData>(initialNotice);
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleFieldChange = (field: keyof LegalNoticeData, value: any) => {
    setNotice(prev => ({ ...prev, [field]: value }));
  };

  const handleFactChange = (index: number, val: string) => {
    const updated = [...notice.facts];
    updated[index] = val;
    setNotice(prev => ({ ...prev, facts: updated }));
  };

  const handleAddFact = () => {
    setNotice(prev => ({ ...prev, facts: [...prev.facts, ''] }));
  };

  const handleRemoveFact = (index: number) => {
    setNotice(prev => ({ ...prev, facts: prev.facts.filter((_, i) => i !== index) }));
  };

  const handleDemandChange = (index: number, val: string) => {
    const updated = [...notice.demands];
    updated[index] = val;
    setNotice(prev => ({ ...prev, demands: updated }));
  };

  const handleAddDemand = () => {
    setNotice(prev => ({ ...prev, demands: [...prev.demands, ''] }));
  };

  const handleRemoveDemand = (index: number) => {
    setNotice(prev => ({ ...prev, demands: prev.demands.filter((_, i) => i !== index) }));
  };

  const handleCopyNoticeText = async () => {
    const textRepresentation = `FORMAL LEGAL DEMAND NOTICE
(UNDER REGISTERED POST WITH ACKNOWLEDGEMENT DUE / SPEED POST)

Date: ${notice.draftedDate}

FROM / SENDER:
${notice.senderName}
${notice.senderAddress}
Contact: ${notice.senderPhone}

TO / ADDRESSEE:
${notice.receiverName}
${notice.receiverAddress}

SUBJECT: ${notice.subject}

Sir / Madam,

Under instructions from and on behalf of my client / the Complainant named above, this formal legal notice is hereby served upon you stating as follows:

1. STATEMENT OF FACTS:
${notice.facts.map((f, i) => `1.${i + 1}. ${f}`).join('\n')}

2. STATUTORY DEMANDS:
${notice.demands.map((d, i) => `2.${i + 1}. ${d}`).join('\n')}

TAKE NOTICE that you are hereby called upon to comply with the above demands within strictly ${notice.statutoryNoticeDays} (fifteen) days from the receipt of this notice, failing which my client shall be constrained to initiate appropriate civil, criminal, and statutory proceedings in the competent Courts of Law solely at your risk, cost, and consequence.

Yours faithfully,
[${notice.senderName}]
Complainant / Aggrieved Citizen`;

    const ok = await copyToClipboard(textRepresentation);
    if (ok) {
      setCopied(true);
      toast.success('Legal notice text copied to clipboard!');
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleDownloadPDF = () => {
    PDFGeneratorService.downloadLegalNoticePDF(notice);
    toast.success('Downloaded official Legal Notice PDF!');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-judiciary-900 dark:text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-gold" />
            Automated Formal Legal Demand Notice
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Court-compliant draft ready for registered speed post service under Indian statutory requirements
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all ${
              isEditing
                ? 'bg-gold text-judiciary-950 border-gold shadow-md'
                : 'bg-white dark:bg-judiciary-900 border-gray-300 dark:border-judiciary-700 text-gray-700 dark:text-gray-200 hover:border-gold'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Preview Document' : 'Customize Draft'}</span>
          </button>

          <button
            onClick={handleCopyNoticeText}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white dark:bg-judiciary-900 border border-gray-300 dark:border-judiciary-700 text-gray-700 dark:text-gray-200 hover:border-gold transition-colors flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Text'}</span>
          </button>

          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-judiciary-800 hover:bg-judiciary-900 text-white flex items-center gap-1.5 shadow-md transition-all border border-gold/30"
          >
            <Download className="w-3.5 h-3.5 text-gold" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Notice Paper / Editor */}
      <div className="bg-white dark:bg-judiciary-900/90 rounded-3xl p-6 sm:p-12 border-2 border-judiciary-200 dark:border-judiciary-800 shadow-2xl space-y-8 font-serif leading-relaxed text-gray-900 dark:text-gray-100 relative">
        {/* Letterhead Banner */}
        <div className="text-center pb-6 border-b-2 border-judiciary-900 dark:border-gold/40 space-y-1">
          <div className="text-lg sm:text-xl font-bold tracking-wider text-judiciary-900 dark:text-gold uppercase font-sans">
            FORMAL LEGAL DEMAND NOTICE
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 italic">
            (ISSUED UNDER REGISTERED POST WITH ACKNOWLEDGEMENT DUE / SPEED POST & EMAIL)
          </div>
          <div className="text-xs font-sans font-bold text-gray-700 dark:text-gray-300 pt-2">
            Date of Service: {notice.draftedDate}
          </div>
        </div>

        {/* Sender & Receiver Coordinates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm font-sans">
          {/* Sender */}
          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-judiciary-950 border border-gray-200 dark:border-judiciary-800 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-judiciary-800 dark:text-gold">
              From / Sender (Aggrieved Party)
            </div>
            {isEditing ? (
              <div className="space-y-2 text-xs">
                <input
                  type="text"
                  value={notice.senderName}
                  onChange={(e) => handleFieldChange('senderName', e.target.value)}
                  placeholder="Your Full Legal Name"
                  className="w-full p-2 rounded-lg border border-gray-300 dark:border-judiciary-700 bg-white dark:bg-judiciary-900"
                />
                <textarea
                  value={notice.senderAddress}
                  onChange={(e) => handleFieldChange('senderAddress', e.target.value)}
                  placeholder="Your Residential Address"
                  rows={2}
                  className="w-full p-2 rounded-lg border border-gray-300 dark:border-judiciary-700 bg-white dark:bg-judiciary-900"
                />
                <input
                  type="text"
                  value={notice.senderPhone}
                  onChange={(e) => handleFieldChange('senderPhone', e.target.value)}
                  placeholder="Phone & Email"
                  className="w-full p-2 rounded-lg border border-gray-300 dark:border-judiciary-700 bg-white dark:bg-judiciary-900"
                />
              </div>
            ) : (
              <div className="text-xs space-y-0.5 text-gray-700 dark:text-gray-300 font-sans">
                <div className="font-bold text-sm text-gray-900 dark:text-white">{notice.senderName}</div>
                <div>{notice.senderAddress}</div>
                <div>Contact: {notice.senderPhone}</div>
              </div>
            )}
          </div>

          {/* Receiver */}
          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-judiciary-950 border border-gray-200 dark:border-judiciary-800 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-secondary">
              To / Addressee (Opposite Party)
            </div>
            {isEditing ? (
              <div className="space-y-2 text-xs">
                <input
                  type="text"
                  value={notice.receiverName}
                  onChange={(e) => handleFieldChange('receiverName', e.target.value)}
                  placeholder="Opposite Party / Landlord / Company"
                  className="w-full p-2 rounded-lg border border-gray-300 dark:border-judiciary-700 bg-white dark:bg-judiciary-900"
                />
                <textarea
                  value={notice.receiverAddress}
                  onChange={(e) => handleFieldChange('receiverAddress', e.target.value)}
                  placeholder="Registered Address of Opposite Party"
                  rows={2}
                  className="w-full p-2 rounded-lg border border-gray-300 dark:border-judiciary-700 bg-white dark:bg-judiciary-900"
                />
              </div>
            ) : (
              <div className="text-xs space-y-0.5 text-gray-700 dark:text-gray-300 font-sans">
                <div className="font-bold text-sm text-gray-900 dark:text-white">{notice.receiverName}</div>
                <div>{notice.receiverAddress}</div>
              </div>
            )}
          </div>
        </div>

        {/* Subject Header */}
        <div className="py-2 border-y border-gray-200 dark:border-judiciary-800">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider font-sans mb-1">
            Subject of Notice
          </div>
          {isEditing ? (
            <input
              type="text"
              value={notice.subject}
              onChange={(e) => handleFieldChange('subject', e.target.value)}
              className="w-full p-2 rounded-lg font-bold text-sm border border-gray-300 dark:border-judiciary-700 bg-white dark:bg-judiciary-900 font-sans text-judiciary-900 dark:text-gold"
            />
          ) : (
            <div className="font-bold text-sm sm:text-base text-judiciary-900 dark:text-gold font-sans leading-snug">
              SUBJECT: {notice.subject}
            </div>
          )}
        </div>

        {/* Opening Salutation */}
        <div className="space-y-4 text-sm sm:text-base leading-relaxed">
          <p>
            <strong>Sir / Madam,</strong>
          </p>
          <p>
            Under instructions from and on behalf of the Sender named herein, this formal legal notice is served upon you setting forth the facts and statutory demands hereunder:
          </p>

          {/* Facts Section */}
          <div className="space-y-3 pt-2">
            <div className="font-bold uppercase tracking-wide text-xs sm:text-sm text-judiciary-900 dark:text-gold font-sans">
              1. STATEMENT OF FACTS:
            </div>
            {notice.facts.map((fact, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="font-bold font-mono text-xs mt-1">1.{idx + 1}.</span>
                {isEditing ? (
                  <div className="flex-1 flex gap-2">
                    <textarea
                      value={fact}
                      onChange={(e) => handleFactChange(idx, e.target.value)}
                      rows={2}
                      className="w-full p-2 rounded-lg text-xs border border-gray-300 dark:border-judiciary-700 bg-white dark:bg-judiciary-900 font-serif"
                    />
                    <button
                      onClick={() => handleRemoveFact(idx)}
                      className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <p className="flex-1 text-sm text-gray-800 dark:text-gray-200">{fact}</p>
                )}
              </div>
            ))}
            {isEditing && (
              <button
                onClick={handleAddFact}
                className="text-xs font-bold text-judiciary-800 dark:text-gold flex items-center gap-1 font-sans mt-2"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Additional Fact Paragraph</span>
              </button>
            )}
          </div>

          {/* Demands Section */}
          <div className="space-y-3 pt-4">
            <div className="font-bold uppercase tracking-wide text-xs sm:text-sm text-judiciary-900 dark:text-gold font-sans">
              2. STATUTORY DEMANDS & RECTIFICATION REQUIRED:
            </div>
            {notice.demands.map((demand, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="font-bold font-mono text-xs mt-1">2.{idx + 1}.</span>
                {isEditing ? (
                  <div className="flex-1 flex gap-2">
                    <textarea
                      value={demand}
                      onChange={(e) => handleDemandChange(idx, e.target.value)}
                      rows={2}
                      className="w-full p-2 rounded-lg text-xs border border-gray-300 dark:border-judiciary-700 bg-white dark:bg-judiciary-900 font-serif"
                    />
                    <button
                      onClick={() => handleRemoveDemand(idx)}
                      className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <p className="flex-1 text-sm text-gray-800 dark:text-gray-200">{demand}</p>
                )}
              </div>
            ))}
            {isEditing && (
              <button
                onClick={handleAddDemand}
                className="text-xs font-bold text-judiciary-800 dark:text-gold flex items-center gap-1 font-sans mt-2"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Demand Clause</span>
              </button>
            )}
          </div>

          {/* 15 Days Warning Clause */}
          <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-xs sm:text-sm font-sans font-semibold text-secondary-dark dark:text-red-300 leading-relaxed mt-6">
            TAKE NOTICE that you are hereby called upon to comply with the above demands within strictly {notice.statutoryNoticeDays} (fifteen) days from the date of receipt of this notice, failing which my client shall be constrained to initiate appropriate civil, criminal, and statutory proceedings in the competent Courts of Law solely at your risk, cost, and consequence.
          </div>

          {/* Signatory */}
          <div className="pt-8 font-sans space-y-1 text-xs">
            <div className="text-gray-600 dark:text-gray-400">Yours faithfully,</div>
            <div className="font-bold text-sm text-gray-900 dark:text-white pt-6">[{notice.senderName}]</div>
            <div className="text-gray-500 dark:text-gray-400 italic">Complainant / Aggrieved Citizen</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LegalNoticeGenerator;
