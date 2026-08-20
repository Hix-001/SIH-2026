import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { TriageProvider } from './context/TriageContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import TriagePage from './pages/TriagePage';
import ResultsPage from './pages/ResultsPage';
import AboutPage from './pages/AboutPage';
import LegalPage from './pages/LegalPage';
import PrivacyPage from './pages/PrivacyPage';
import ErrorBoundary from './components/common/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ThemeProvider>
          <LanguageProvider>
            <TriageProvider>
              <BrowserRouter>
                <Layout>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/triage" element={<TriagePage />} />
                    <Route path="/results" element={<ResultsPage />} />
                    <Route path="/legal" element={<LegalPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/architecture" element={<AboutPage />} />
                    <Route path="/privacy" element={<PrivacyPage />} />
                    {/* Fallback */}
                    <Route path="*" element={<HomePage />} />
                  </Routes>
                </Layout>
                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: '#0d1442',
                      color: '#ffffff',
                      borderRadius: '16px',
                      padding: '14px 18px',
                      fontSize: '13px',
                      fontWeight: 600,
                      border: '1px solid rgba(245, 200, 66, 0.4)',
                      boxShadow: '0 15px 40px rgba(0, 0, 0, 0.3)'
                    }
                  }}
                />
              </BrowserRouter>
            </TriageProvider>
          </LanguageProvider>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
