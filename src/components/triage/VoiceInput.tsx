import React, { useState } from 'react';
import { Mic, MicOff, Volume2, RotateCcw, Check, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';
import { useTriage } from '../../context/TriageContext';
import { useLanguage } from '../../context/LanguageContext';
import toast from 'react-hot-toast';

export const VoiceInput: React.FC = () => {
  const { updateFormField, currentForm } = useTriage();
  const { currentLanguage, supportedLanguages } = useLanguage();
  const [selectedVoiceLang, setSelectedVoiceLang] = useState<string>('en-IN');

  const {
    isListening,
    transcript,
    interimTranscript,
    audioLevel,
    error,
    isSupported,
    startListening,
    stopListening,
    resetTranscript
  } = useSpeechRecognition({
    lang: selectedVoiceLang,
    onTranscript: (newTranscript) => {
      updateFormField('query', newTranscript);
    }
  });

  const handleToggleListening = () => {
    if (!isSupported) {
      toast.error('Web Speech API is not supported in this browser. Please use text input or Chrome/Edge.');
      return;
    }
    if (isListening) {
      stopListening();
      toast.success('Voice recording stopped and transcribed!');
    } else {
      startListening();
      toast('Listening... Speak your legal dispute clearly.', { icon: '🎙️' });
    }
  };

  const handleApplyToForm = () => {
    const combined = (transcript + ' ' + interimTranscript).trim();
    if (combined) {
      updateFormField('query', combined);
      toast.success('Voice transcript added to your dispute description!');
    }
  };

  return (
    <div className="glass-card rounded-3xl p-6 border border-gray-200 dark:border-judiciary-800 shadow-xl flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-judiciary-100 dark:bg-judiciary-900 text-judiciary-800 dark:text-gold'}`}>
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-judiciary-900 dark:text-white">
                Voice Legal Input
              </h3>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">
                Speak in your preferred Indic language
              </p>
            </div>
          </div>

          <select
            value={selectedVoiceLang}
            onChange={(e) => setSelectedVoiceLang(e.target.value)}
            className="text-xs bg-gray-50 dark:bg-judiciary-900 border border-gray-200 dark:border-judiciary-700 rounded-lg px-2 py-1 text-gray-700 dark:text-gray-200 focus:outline-none focus:border-gold"
          >
            <option value="en-IN">English (India)</option>
            <option value="hi-IN">हिन्दी (Hindi)</option>
            <option value="ta-IN">தமிழ் (Tamil)</option>
            <option value="bn-IN">বাংলা (Bengali)</option>
            <option value="te-IN">తెలుగు (Telugu)</option>
            <option value="mr-IN">मराठी (Marathi)</option>
            <option value="gu-IN">ગુજરાતી (Gujarati)</option>
            <option value="kn-IN">ಕನ್ನಡ (Kannada)</option>
          </select>
        </div>

        {/* Audio Waveform Visualizer */}
        <div className="my-5 p-4 rounded-2xl bg-gray-900 text-white flex flex-col items-center justify-center min-h-[110px] relative overflow-hidden border border-gray-800">
          {isListening ? (
            <div className="flex items-center gap-1.5 h-12">
              {[40, 75, 30, 90, 60, 100, 45, 80, 55, 95, 35, 70].map((height, i) => (
                <motion.div
                  key={i}
                  animate={{
                    height: [
                      `${Math.max(10, height * audioLevel)}%`,
                      `${Math.max(15, height * (0.3 + Math.random() * 0.7))}%`,
                      `${Math.max(10, height * audioLevel)}%`
                    ]
                  }}
                  transition={{ duration: 0.3, repeat: Infinity, delay: i * 0.05 }}
                  className="w-1.5 bg-gradient-to-t from-gold to-accent rounded-full"
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-xs text-gray-400 flex flex-col items-center gap-1">
              <Volume2 className="w-5 h-5 text-gray-500 mb-1" />
              <span>Click the microphone button to start recording</span>
            </div>
          )}

          {isListening && (
            <span className="text-[10px] font-bold tracking-widest uppercase text-red-400 mt-2 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              Recording Live Speech...
            </span>
          )}
        </div>

        {/* Transcript Box */}
        {(transcript || interimTranscript) && (
          <div className="p-3 rounded-xl bg-gray-50 dark:bg-judiciary-950 border border-gray-200 dark:border-judiciary-800 text-xs text-gray-800 dark:text-gray-200 mb-4 max-h-24 overflow-y-auto">
            <span className="font-semibold text-judiciary-800 dark:text-gold">Recognized: </span>
            {transcript} <span className="text-gray-400 italic">{interimTranscript}</span>
          </div>
        )}

        {error && (
          <div className="p-2.5 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-600 dark:text-red-300 flex items-center gap-2 mb-4">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Control Buttons */}
      <div className="flex items-center gap-2 pt-2">
        <button
          onClick={handleToggleListening}
          className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md ${
            isListening
              ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse'
              : 'bg-judiciary-800 hover:bg-judiciary-900 text-white'
          }`}
        >
          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-gold" />}
          <span>{isListening ? 'Stop Recording' : 'Start Voice Triage'}</span>
        </button>

        {transcript && (
          <button
            onClick={resetTranscript}
            className="p-3 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-judiciary-900 transition-colors"
            title="Clear Transcript"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
export default VoiceInput;
