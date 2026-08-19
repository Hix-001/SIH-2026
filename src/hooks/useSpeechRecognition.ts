import { useState, useEffect, useRef, useCallback } from 'react';

// Declarations for Web Speech API
interface SpeechRecognitionEvent {
  resultIndex: number;
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
      isFinal: boolean;
    };
    length: number;
  };
}

interface WebkitSpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onstart: () => void;
  onend: () => void;
  onerror: (event: { error: string }) => void;
  onresult: (event: SpeechRecognitionEvent) => void;
}

declare global {
  interface Window {
    SpeechRecognition?: new () => WebkitSpeechRecognition;
    webkitSpeechRecognition?: new () => WebkitSpeechRecognition;
  }
}

export function useSpeechRecognition(options?: {
  lang?: string;
  onTranscript?: (transcript: string) => void;
}) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [audioLevel, setAudioLevel] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(true);

  const recognitionRef = useRef<WebkitSpeechRecognition | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const lang = options?.lang || 'en-IN';

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = lang;

      recognition.onstart = () => {
        setIsListening(true);
        setError(null);
        startAudioWaveAnimation();
      };

      recognition.onend = () => {
        setIsListening(false);
        stopAudioWaveAnimation();
      };

      recognition.onerror = (e) => {
        setError(e.error || 'Microphone error');
        setIsListening(false);
        stopAudioWaveAnimation();
      };

      recognition.onresult = (e: SpeechRecognitionEvent) => {
        let currentFinal = '';
        let currentInterim = '';

        for (let i = e.resultIndex; i < e.results.length; ++i) {
          if (e.results[i].isFinal) {
            currentFinal += e.results[i][0].transcript + ' ';
          } else {
            currentInterim += e.results[i][0].transcript;
          }
        }

        if (currentFinal) {
          setTranscript(prev => {
            const updated = (prev + ' ' + currentFinal).trim();
            if (options?.onTranscript) {
              options.onTranscript(updated);
            }
            return updated;
          });
        }
        setInterimTranscript(currentInterim);
      };

      recognitionRef.current = recognition;
    } catch (err) {
      console.warn('SpeechRecognition initialization error:', err);
      setIsSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      stopAudioWaveAnimation();
    };
  }, [lang]);

  const startAudioWaveAnimation = () => {
    const simulateVolume = () => {
      setAudioLevel(Math.random() * 0.8 + 0.2);
      animationFrameRef.current = requestAnimationFrame(simulateVolume);
    };
    simulateVolume();
  };

  const stopAudioWaveAnimation = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setAudioLevel(0);
  };

  const startListening = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.lang = lang;
        recognitionRef.current.start();
      } catch {
        // Handle potential duplicate start call
      }
    }
  }, [isListening, lang]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Handle stop
      }
    }
  }, [isListening]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setInterimTranscript('');
  }, []);

  return {
    isListening,
    transcript,
    interimTranscript,
    audioLevel,
    error,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
    setTranscript
  };
}
