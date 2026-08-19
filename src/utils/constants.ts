import { LegalCategory, LegalSectionItem, PrecedentSummary, LegalAuthorityContact } from '../types/legal.types';

export const OFFICIAL_HELPLINES = {
  CYBER_FRAUD: {
    number: '1930',
    title: 'National Cyber Crime Helpline (Citizen Financial Fraud)',
    portal: 'https://cybercrime.gov.in',
    description: 'Golden hour reporting for freeze of siphoned funds in bank accounts & UPI.'
  },
  CONSUMER: {
    number: '1915',
    title: 'National Consumer Helpline (NCH)',
    portal: 'https://edaakhil.nic.in',
    description: 'For consumer deficiency, e-commerce refunds, warranty refusal.'
  },
  LEGAL_AID: {
    number: '15100',
    title: 'NALSA Tele-Law & Free Legal Services Authority',
    portal: 'https://nalsa.gov.in',
    description: 'Constitutional free legal aid under Article 39A for eligible citizens.'
  },
  EMERGENCY: {
    number: '112',
    title: 'National Emergency Response Support System (ERSS)',
    portal: 'https://112.gov.in',
    description: 'Immediate police, fire, or ambulance dispatch.'
  },
  WOMEN_SAFETY: {
    number: '181',
    title: 'Women in Distress Helpline',
    portal: 'https://wcd.nic.in',
    description: '24x7 support for harassment, stalking, and domestic safety.'
  }
};

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English', region: 'Pan-India' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', region: 'North/Central India' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', region: 'Tamil Nadu' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', region: 'West Bengal' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', region: 'Andhra Pradesh & Telangana' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', region: 'Maharashtra' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', region: 'Gujarat' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', region: 'Karnataka' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', region: 'Kerala' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', region: 'Punjab' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', region: 'Odisha' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', region: 'Assam' }
] as const;

export const CATEGORY_METADATA: Record<LegalCategory, {
  title: string;
  iconName: string;
  badgeColor: string;
  bgLight: string;
  description: string;
  samplePrompt: string;
}> = {
  property_landlord_dispute: {
    title: 'Landlord & Tenant Disputes',
    iconName: 'Building',
    badgeColor: 'text-amber-700 bg-amber-100 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300',
    bgLight: 'bg-amber-50',
    description: 'Security deposit withholding, illegal eviction, arbitrary rent hikes, maintenance disputes.',
    samplePrompt: 'My landlord in Bengaluru is refusing to refund my security deposit of ₹75,000 even after I vacated 45 days ago with zero damages.'
  },
  online_financial_fraud: {
    title: 'Online UPI & Cyber Fraud',
    iconName: 'ShieldAlert',
    badgeColor: 'text-red-700 bg-red-100 border-red-300 dark:bg-red-950/60 dark:text-red-300',
    bgLight: 'bg-red-50',
    description: 'QR code scam, fake customer care, unauthorized debit, phishing, OLX payment scams.',
    samplePrompt: 'I received a call pretending to be electricity board staff. They made me scan a QR code to avoid power disconnection, and ₹35,000 was debited from my SBI account via UPI.'
  },
  consumer_deficiency: {
    title: 'Consumer & E-Commerce Disputes',
    iconName: 'ShoppingBag',
    badgeColor: 'text-blue-700 bg-blue-100 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300',
    bgLight: 'bg-blue-50',
    description: 'Defective electronics, refund rejection, flight cancellation denial, deceptive ads.',
    samplePrompt: 'Ordered a laptop worth ₹62,000 from an online platform. Received a duplicate box with a broken screen. The customer support refused replacement stating 7 days passed.'
  },
  cyber_stalking_harassment: {
    title: 'Cyberstalking & Digital Harassment',
    iconName: 'EyeOff',
    badgeColor: 'text-purple-700 bg-purple-100 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300',
    bgLight: 'bg-purple-50',
    description: 'Morphing photos, unsolicited messages, doxxing, non-consensual image sharing.',
    samplePrompt: 'An unknown person created fake Instagram and WhatsApp profiles using my contact number and pictures, sending threatening messages and demanding money.'
  },
  cheque_bounce_financial: {
    title: 'Cheque Bounce & Debt Recovery',
    iconName: 'CreditCard',
    badgeColor: 'text-emerald-700 bg-emerald-100 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300',
    bgLight: 'bg-emerald-50',
    description: 'Section 138 NI Act dishonor of cheque, unpaid freelance invoices, promissory note default.',
    samplePrompt: 'Client issued a cheque of ₹1,20,000 against completed freelance design work. The cheque bounced with remark "Funds Insufficient". Notice period is about to lapse.'
  },
  employment_workplace: {
    title: 'Workplace & Salary Issues',
    iconName: 'Briefcase',
    badgeColor: 'text-indigo-700 bg-indigo-100 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300',
    bgLight: 'bg-indigo-50',
    description: 'Unpaid wages, abrupt termination without notice, POSH harassment, PF withholding.',
    samplePrompt: 'My previous employer has withheld 2 months of pending salary (₹90,000) and experience certificate after I served my full 30 days notice period.'
  },
  motor_accident_insurance: {
    title: 'Motor Accident & Insurance Claims',
    iconName: 'Car',
    badgeColor: 'text-cyan-700 bg-cyan-100 border-cyan-300 dark:bg-cyan-950/60 dark:text-cyan-300',
    bgLight: 'bg-cyan-50',
    description: 'MACT claims, vehicle damage repudiation by insurer, hit and run compensation.',
    samplePrompt: 'My health insurance claim of ₹1,40,000 for emergency surgery was rejected citing non-disclosure of existing minor allergy, which is completely unjustified.'
  },
  general_civil_criminal: {
    title: 'General Civil / Criminal Infringement',
    iconName: 'Scale',
    badgeColor: 'text-gray-700 bg-gray-100 border-gray-300 dark:bg-gray-800 dark:text-gray-200',
    bgLight: 'bg-gray-50',
    description: 'Criminal intimidation, public nuisance, property boundary encroachment, defamation.',
    samplePrompt: 'Neighbor has built a temporary construction blocking my legal driveway access and verbally abused my family with threats of violence when questioned.'
  }
};

export const STATUTE_KNOWLEDGE_BASE: Record<string, LegalSectionItem> = {
  BNS_316_CHEATING: {
    id: 'bns_316',
    act: 'Bharatiya Nyaya Sanhita (BNS), 2023',
    section: 'Section 316 / 318',
    oldIpcSection: 'IPC Section 415 & 420 (Cheating & Dishonestly Inducing Delivery)',
    title: 'Cheating and Dishonestly Inducing Delivery of Property',
    description: 'Whoever dishonestly induces the person so deceived to deliver any property to any person, or to make, alter or destroy the whole or any part of a valuable security.',
    keyElements: [
      'Deception of any person fraudulently or dishonestly',
      'Inducing the person to deliver property or money',
      'Mental element of fraudulent intent at the inception of transaction'
    ],
    relevanceScore: 0.95,
    punishment: 'Imprisonment up to 7 years and fine',
    cognizable: true,
    bailable: false,
    compoundable: false
  },
  BNS_303_BREACH_OF_TRUST: {
    id: 'bns_303',
    act: 'Bharatiya Nyaya Sanhita (BNS), 2023',
    section: 'Section 316(1) & Section 303',
    oldIpcSection: 'IPC Section 405 & 406 (Criminal Breach of Trust)',
    title: 'Criminal Breach of Trust',
    description: 'Dishonest misappropriation or conversion to own use of property entrusted, or dishonest use or disposal of that property in violation of legal contract or direction.',
    keyElements: [
      'Entrustment of property (e.g. Tenancy deposit, security pledge)',
      'Dishonest misappropriation or conversion for personal use',
      'Refusal to return upon fulfillment of contractual conditions'
    ],
    relevanceScore: 0.93,
    punishment: 'Imprisonment up to 3 years, or fine, or both (extended to 7 years for clerks/servants)',
    cognizable: true,
    bailable: false,
    compoundable: true
  },
  BNS_351_INTIMIDATION: {
    id: 'bns_351',
    act: 'Bharatiya Nyaya Sanhita (BNS), 2023',
    section: 'Section 351(2)',
    oldIpcSection: 'IPC Section 503 & 506 (Criminal Intimidation)',
    title: 'Criminal Intimidation',
    description: 'Threatening another with injury to person, reputation or property with intent to cause alarm or cause that person to do any act which he is not legally bound to do.',
    keyElements: [
      'Threat of injury to person, property, or reputation',
      'Intent to cause alarm or force unlawful compliance'
    ],
    relevanceScore: 0.88,
    punishment: 'Imprisonment up to 2 years, or fine, or both (up to 7 years if threat is grievous/death)',
    cognizable: false,
    bailable: true,
    compoundable: true
  },
  BNS_78_STALKING: {
    id: 'bns_78',
    act: 'Bharatiya Nyaya Sanhita (BNS), 2023',
    section: 'Section 78',
    oldIpcSection: 'IPC Section 354D (Stalking / Cyberstalking)',
    title: 'Stalking and Electronic Surveillance',
    description: 'Monitoring the use by a woman of the internet, email or any other form of electronic communication, or repeatedly following or attempting to contact despite clear disinterest.',
    keyElements: [
      'Electronic surveillance or repeated online tracking',
      'Attempts to foster personal interaction despite clear indication of disinterest',
      'Targeted harassment creating apprehension of safety'
    ],
    relevanceScore: 0.96,
    punishment: '1st Offence: up to 3 years imprisonment + fine; 2nd Offence: up to 5 years + fine',
    cognizable: true,
    bailable: true,
    compoundable: false
  },
  IT_ACT_66D: {
    id: 'it_act_66d',
    act: 'Information Technology Act, 2000 (Amended 2008)',
    section: 'Section 66D',
    oldIpcSection: 'Read along with BNS Section 318(4) (Cyber Impersonation Cheating)',
    title: 'Punishment for Cheating by Personation using Computer Resource',
    description: 'Whoever, by means of any communication device or computer resource, cheats by personation, shall be punished with imprisonment and fine.',
    keyElements: [
      'Use of computer resource, phone, internet, or UPI gateway',
      'Impersonation of official bank personnel, utility staff, or legitimate business',
      'Deceptive inducement leading to financial transfer'
    ],
    relevanceScore: 0.98,
    punishment: 'Imprisonment up to 3 years and fine up to ₹1,00,000',
    cognizable: true,
    bailable: false,
    compoundable: false
  },
  IT_ACT_66C: {
    id: 'it_act_66c',
    act: 'Information Technology Act, 2000',
    section: 'Section 66C',
    oldIpcSection: 'Identity Theft & Electronic Password / OTP Fraud',
    title: 'Identity Theft & Fraudulent Use of Electronic Signature / Password',
    description: 'Whoever fraudulently or dishonestly makes use of the electronic signature, password or any other unique identification feature of any other person.',
    keyElements: [
      'Unlawful capture or interception of OTP, UPI PIN, or login credentials',
      'Unauthorized access into financial application or wallet'
    ],
    relevanceScore: 0.92,
    punishment: 'Imprisonment up to 3 years and fine up to ₹1,00,000',
    cognizable: true,
    bailable: true,
    compoundable: false
  },
  CPA_2019_DEFICIENCY: {
    id: 'cpa_2019_deficiency',
    act: 'Consumer Protection Act, 2019',
    section: 'Section 2(11) & Section 35',
    oldIpcSection: 'Civil Redressal (Replacing CPA 1986 Section 12)',
    title: 'Deficiency of Service & Filing Complaint before District Commission',
    description: 'Any fault, imperfection, shortcoming or inadequacy in the quality, nature and manner of performance required to be maintained by law or contract in relation to any service or goods.',
    keyElements: [
      'Consumer status established via invoice / transaction receipt',
      'Shortcoming in agreed goods or service quality',
      'Failure of merchant/seller/e-commerce marketplace to cure within reasonable time'
    ],
    relevanceScore: 0.94,
    punishment: 'Order of full refund + interest + compensation for harassment + litigation costs',
    cognizable: false,
    bailable: true,
    compoundable: true
  },
  NI_ACT_138: {
    id: 'ni_act_138',
    act: 'Negotiable Instruments Act, 1881',
    section: 'Section 138',
    oldIpcSection: 'Dishonor of Cheque for Insufficiency of Funds',
    title: 'Dishonor of Cheque for Insufficiency of Funds in the Account',
    description: 'Where any cheque drawn for discharge of any debt or other liability is returned unpaid by the bank due to insufficiency of amount.',
    keyElements: [
      'Cheque presented to the bank within 3 months of date of issue',
      'Return memo received indicating insufficient funds or account closed',
      'Statutory legal demand notice issued within 30 days of receipt of return memo',
      'Failure of drawer to pay within 15 days of receiving notice'
    ],
    relevanceScore: 0.97,
    punishment: 'Imprisonment up to 2 years, or with fine up to twice the amount of the cheque, or both',
    cognizable: false,
    bailable: true,
    compoundable: true
  }
};

export const SAMPLE_SCENARIOS = [
  {
    id: 'landlord_deposit',
    category: 'property_landlord_dispute' as LegalCategory,
    title: 'Bengaluru Landlord Refusing Security Deposit Refund',
    preview: '₹80,000 withheld for 60 days without justification or inspection report',
    tag: 'Property & RERA',
    query: 'I vacated my rented flat in Indiranagar, Bengaluru on 1st July after giving 1 month advance notice as per the rental agreement. The landlord inspected the house and found no damage. However, he is now not picking up my calls and refusing to return my security deposit of ₹80,000 for over 60 days. What legal steps can I take?'
  },
  {
    id: 'upi_electricity_scam',
    category: 'online_financial_fraud' as LegalCategory,
    title: 'Fake Electricity Bill Update UPI Fraud',
    preview: '₹45,000 siphoned via deceptive APK / QR code payment',
    tag: 'Cybercrime 1930',
    query: 'I received an SMS claiming my electricity power will be disconnected at 9:30 PM due to unpaid bill. The caller asked me to make a test payment of ₹10 using AnyDesk / APK link. When I authorized, ₹45,000 was debited in three transactions to a suspicious UPI ID. The transaction happened 2 hours ago.'
  },
  {
    id: 'defective_smartphone',
    category: 'consumer_deficiency' as LegalCategory,
    title: 'E-Commerce Refusal to Replace Defective Phone',
    preview: 'Delivered defective unit, seller rejected replacement within 7 days',
    tag: 'Consumer Protection',
    query: 'I bought a premium smartphone for ₹54,999 on a major e-commerce marketplace. Upon opening the box, the screen had dead pixels and the battery drain was extreme. I raised a replacement request on day 2 itself, but the customer support closed my ticket claiming physical damage by customer, which is completely false.'
  },
  {
    id: 'freelance_unpaid',
    category: 'cheque_bounce_financial' as LegalCategory,
    title: 'Bounced Cheque & Unpaid Web Development Invoice',
    preview: 'Client issued ₹1,50,000 cheque that dishonored due to insufficient funds',
    tag: 'Section 138 NI Act',
    query: 'A private marketing agency hired me for full-stack software development. Upon delivery, they gave me a cheque of ₹1,50,000 dated August 10th. The bank returned the cheque with memo stating "Insufficient Funds". The agency director is now threatening to block me if I ask again.'
  }
];
