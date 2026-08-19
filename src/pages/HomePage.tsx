import React from 'react';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import PresetScenariosSection from '../components/home/PresetScenariosSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import StatsSection from '../components/home/StatsSection';
import CTASection from '../components/home/CTASection';
import LegalDisclaimer from '../components/common/LegalDisclaimer';

export const HomePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>NyayaSetu | Citizen Legal Triage & Automated Rights Navigator</title>
        <meta
          name="description"
          content="AI-Powered Citizen Legal Triage for Indian Citizens under Bharatiya Nyaya Sanhita (BNS 2023), IT Act, and Consumer Protection Act with instant notice generation."
        />
      </Helmet>

      <HeroSection />
      <FeaturesSection />
      <PresetScenariosSection />
      <HowItWorksSection />
      <StatsSection />
      <CTASection />

      <div className="container mx-auto px-4 sm:px-6 py-8">
        <LegalDisclaimer />
      </div>
    </>
  );
};
export default HomePage;
