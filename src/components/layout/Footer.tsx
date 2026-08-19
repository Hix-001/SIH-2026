import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, ShieldCheck, PhoneCall, ExternalLink, Heart, Award, ArrowUpRight } from 'lucide-react';
import { OFFICIAL_HELPLINES } from '../../utils/constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-judiciary-900 to-judiciary-950 text-white pt-16 pb-12 border-t border-gold/20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand & Theme */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-judiciary-800 border border-gold/40 flex items-center justify-center">
                <img src="/logo.svg" alt="NyayaSetu Emblem" className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold font-sans text-white">
                Nyaya<span className="text-gold">Setu</span>
              </span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Citizen Legal Triage & Automated Rights Navigator. Transforming statutory complexity into clear, actionable, and rights-focused guidance for 1.4 Billion citizens.
            </p>
            <div className="flex items-center gap-2 pt-1 text-xs text-gold">
              <Award className="w-4 h-4" />
              <span>Smart Automation Theme • SIH 2026 Prototype</span>
            </div>
          </div>

          {/* Col 2: Legal Statutes Covered */}
          <div>
            <h4 className="text-sm font-bold text-gold uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Statutory Frameworks
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
                <span>Bharatiya Nyaya Sanhita (BNS), 2023</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
                <span>Information Technology Act, 2000</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
                <span>Consumer Protection Act, 2019</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
                <span>Section 138 Negotiable Instruments Act</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
                <span>Real Estate (RERA) & State Tenancy Acts</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Official Portals */}
          <div>
            <h4 className="text-sm font-bold text-gold uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Official Portals
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li>
                <a
                  href="https://cybercrime.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between hover:text-gold transition-colors group"
                >
                  <span>National Cyber Crime Portal</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a
                  href="https://edaakhil.nic.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between hover:text-gold transition-colors group"
                >
                  <span>e-Daakhil Consumer Court</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a
                  href="https://nalsa.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between hover:text-gold transition-colors group"
                >
                  <span>NALSA Free Legal Aid Portal</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a
                  href="https://services.ecourts.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between hover:text-gold transition-colors group"
                >
                  <span>e-Courts Services Case Search</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Emergency Contacts */}
          <div>
            <h4 className="text-sm font-bold text-gold uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Emergency Hotlines
            </h4>
            <div className="space-y-3 text-xs">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <div className="text-gray-400">Cyber Crime Helpline</div>
                <div className="text-sm font-bold text-red-400 mt-0.5 flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{OFFICIAL_HELPLINES.CYBER_FRAUD.number} (Toll-Free 24x7)</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <div className="text-gray-400">National Consumer Helpline</div>
                <div className="text-sm font-bold text-accent mt-0.5 flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{OFFICIAL_HELPLINES.CONSUMER.number}</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <div className="text-gray-400">NALSA Legal Aid Tele-Law</div>
                <div className="text-sm font-bold text-emerald-400 mt-0.5 flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{OFFICIAL_HELPLINES.LEGAL_AID.number}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <span>© 2026 NyayaSetu. Built for Smart India Hackathon (SIH 2026).</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-gold transition-colors">Privacy Guarantee</Link>
            <Link to="/legal" className="hover:text-gold transition-colors">BNS Directory</Link>
            <Link to="/about" className="hover:text-gold transition-colors">Team & Architecture</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
