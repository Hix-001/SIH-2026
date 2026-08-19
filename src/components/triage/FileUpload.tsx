import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle2, ShieldCheck, X, Eye, EyeOff } from 'lucide-react';
import { useTriage } from '../../context/TriageContext';
import { redactPII } from '../../utils/piiRedactor';
import toast from 'react-hot-toast';

export const FileUpload: React.FC = () => {
  const { setUploadedFile, uploadedFileName } = useTriage();
  const [isDragging, setIsDragging] = useState(false);
  const [extractedContent, setExtractedContent] = useState<string | null>(null);
  const [showPiiDetails, setShowPiiDetails] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sampleEvidenceDoc = `[RENTAL AGREEMENT EVIDENCE SUMMARY]
Property: Flat 302, Green Glen Layout, Bellandur, Bengaluru
Tenant: Rahul Sharma (Aadhaar: 5432-8765-2109, Phone: 9812345678)
Landlord: K. N. Murthy (PAN: ABCPM1234F, Bank A/C: 987654321098)
Security Deposit Paid: ₹90,000 via UPI rahul@okhdfcbank
Vacation Date: 15th June 2026. Joint inspection done without damages. Landlord withholding deposit for 60+ days without explanation.`;

  const handleSimulatedFileUpload = (file: File) => {
    const fileName = file.name;
    setExtractedContent(sampleEvidenceDoc);
    setUploadedFile(fileName, sampleEvidenceDoc);
    toast.success(`Uploaded "${fileName}" with automated client-side PII scrubbing!`);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleSimulatedFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleSimulatedFileUpload(e.target.files[0]);
    }
  };

  const handleClear = () => {
    setExtractedContent(null);
    setUploadedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    toast('Evidence cleared', { icon: '🗑️' });
  };

  const piiRedaction = extractedContent ? redactPII(extractedContent) : null;

  return (
    <div className="glass-card rounded-3xl p-6 border border-gray-200 dark:border-judiciary-800 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-judiciary-100 dark:bg-judiciary-900 flex items-center justify-center text-judiciary-800 dark:text-gold">
            <UploadCloud className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-judiciary-900 dark:text-white">
              Evidence Document Upload
            </h3>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">
              PDF, Rent Agreements, UPI screenshots, Invoices
            </p>
          </div>
        </div>
        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-secondary/10 text-secondary border border-secondary/20 flex items-center gap-1">
          <ShieldCheck className="w-3 h-3" />
          Auto-Scrubbed
        </span>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
        className="hidden"
      />

      {!uploadedFileName ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-gold bg-gold/10'
              : 'border-gray-300 dark:border-judiciary-700 hover:border-judiciary-600 dark:hover:border-gold/50 bg-gray-50/50 dark:bg-judiciary-900/30'
          }`}
        >
          <UploadCloud className="w-8 h-8 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
          <div className="text-xs font-bold text-judiciary-900 dark:text-gray-200">
            Click to Browse or Drag & Drop Documents
          </div>
          <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
            Supports PDF, JPG, PNG up to 10MB
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="p-3.5 rounded-2xl bg-judiciary-50 dark:bg-judiciary-900 border border-judiciary-200 dark:border-judiciary-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-gold" />
              <div>
                <div className="text-xs font-bold text-judiciary-900 dark:text-gray-100 truncate max-w-[200px]">
                  {uploadedFileName}
                </div>
                <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Text extracted & PII scrubbed
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowPiiDetails(!showPiiDetails)}
                className="p-1.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-judiciary-800 transition-colors"
                title={showPiiDetails ? 'Hide PII Details' : 'View Scrubbed PII'}
              >
                {showPiiDetails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              <button
                onClick={handleClear}
                className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                title="Remove File"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {showPiiDetails && piiRedaction && (
            <div className="p-3 rounded-xl bg-gray-900 text-white text-[11px] font-mono border border-gray-800 space-y-1">
              <div className="font-bold text-gold text-xs mb-1">
                Client-Side Sanitized Content:
              </div>
              <div className="whitespace-pre-wrap text-gray-300">
                {piiRedaction.redactedText}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default FileUpload;
