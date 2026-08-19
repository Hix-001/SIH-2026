import { TriageFormData, TriageResult, LegalCategory, RiskLevel, LegalNoticeData, LegalAuthorityContact, PrecedentSummary } from '../types/legal.types';
import { STATUTE_KNOWLEDGE_BASE, OFFICIAL_HELPLINES, CATEGORY_METADATA } from '../utils/constants';
import { redactPII } from '../utils/piiRedactor';
import { generateRandomId } from '../utils/helpers';

export class LegalTriageService {
  /**
   * Analyze legal dispute text and metadata, returning structured triage assessment
   */
  public static async analyzeDispute(data: TriageFormData): Promise<TriageResult> {
    // 1. Scrub PII first
    const piiRedaction = redactPII(data.query);
    const queryLower = data.query.toLowerCase();

    // 2. Identify Category
    let category: LegalCategory = data.categoryHint || 'general_civil_criminal';

    if (
      queryLower.includes('rent') ||
      queryLower.includes('landlord') ||
      queryLower.includes('tenant') ||
      queryLower.includes('deposit') ||
      queryLower.includes('evict') ||
      queryLower.includes('lease')
    ) {
      category = 'property_landlord_dispute';
    } else if (
      queryLower.includes('upi') ||
      queryLower.includes('fraud') ||
      queryLower.includes('qr code') ||
      queryLower.includes('debited') ||
      queryLower.includes('otp') ||
      queryLower.includes('electricity') ||
      queryLower.includes('scam') ||
      queryLower.includes('phishing') ||
      queryLower.includes('cyber')
    ) {
      category = 'online_financial_fraud';
    } else if (
      queryLower.includes('laptop') ||
      queryLower.includes('phone') ||
      queryLower.includes('product') ||
      queryLower.includes('flipkart') ||
      queryLower.includes('amazon') ||
      queryLower.includes('replacement') ||
      queryLower.includes('defective') ||
      queryLower.includes('consumer') ||
      queryLower.includes('warranty')
    ) {
      category = 'consumer_deficiency';
    } else if (
      queryLower.includes('stalk') ||
      queryLower.includes('instagram') ||
      queryLower.includes('whatsapp') ||
      queryLower.includes('photos') ||
      queryLower.includes('harass') ||
      queryLower.includes('threat') ||
      queryLower.includes('morph')
    ) {
      category = 'cyber_stalking_harassment';
    } else if (
      queryLower.includes('cheque') ||
      queryLower.includes('bounced') ||
      queryLower.includes('dishonour') ||
      queryLower.includes('insufficient funds') ||
      queryLower.includes('unpaid invoice') ||
      queryLower.includes('138')
    ) {
      category = 'cheque_bounce_financial';
    } else if (
      queryLower.includes('salary') ||
      queryLower.includes('employer') ||
      queryLower.includes('company') ||
      queryLower.includes('wages') ||
      queryLower.includes('notice period')
    ) {
      category = 'employment_workplace';
    }

    // 3. Determine Risk Level
    let riskLevel: RiskLevel = 'moderate';
    let riskReason = 'Standard civil/statutory dispute requiring formal notice within statutory timeframe.';

    if (category === 'online_financial_fraud') {
      riskLevel = 'critical';
      riskReason = 'Financial siphoning requires urgent Golden Hour (within 24 hrs) reporting on 1930 Helpline to freeze suspect accounts.';
    } else if (category === 'cyber_stalking_harassment') {
      riskLevel = 'high';
      riskReason = 'Ongoing digital harassment carries safety risk; requires swift cyber police complaint under BNS Section 78 / IT Act 66E.';
    } else if (category === 'cheque_bounce_financial') {
      riskLevel = 'high';
      riskReason = 'Strict 30-day statutory limitation clock for issuing legal notice under Section 138 of the NI Act.';
    }

    // 4. Assemble Legal Sections
    const legalSections = this.getSectionsForCategory(category, queryLower);

    // 5. Build Actionable Steps
    const actionSteps = this.getStepsForCategory(category);

    // 6. Relevant Authorities
    const authorities = this.getAuthoritiesForCategory(category);

    // 7. Precedents
    const precedents = this.getPrecedentsForCategory(category);

    // 8. Notice Template
    const noticeTemplate = this.generateNoticeDraft(category, data);

    const meta = CATEGORY_METADATA[category];

    return {
      queryId: generateRandomId('triage'),
      originalQuery: data.query,
      redactedQuery: piiRedaction.redactedText,
      category,
      categoryDisplayName: meta.title,
      summary: this.generateExecutiveSummary(category, data.query),
      intent: category,
      riskLevel,
      riskReason,
      limitationPeriod: this.getLimitationPeriod(category),
      statutoryTimeframeNotice: this.getStatutoryNoticeTimeframe(category),
      legalSections,
      actionSteps,
      authorities,
      precedents,
      noticeTemplate,
      piiItemsFound: piiRedaction.entities.map(e => ({
        type: e.type === 'upi' ? 'bank_account' : e.type,
        originalMasked: e.masked
      })),
      generatedAt: new Date().toISOString()
    };
  }

  private static getSectionsForCategory(category: LegalCategory, query: string) {
    switch (category) {
      case 'property_landlord_dispute':
        return [
          STATUTE_KNOWLEDGE_BASE.BNS_303_BREACH_OF_TRUST,
          STATUTE_KNOWLEDGE_BASE.BNS_316_CHEATING,
          STATUTE_KNOWLEDGE_BASE.BNS_351_INTIMIDATION
        ];
      case 'online_financial_fraud':
        return [
          STATUTE_KNOWLEDGE_BASE.IT_ACT_66D,
          STATUTE_KNOWLEDGE_BASE.BNS_316_CHEATING,
          STATUTE_KNOWLEDGE_BASE.IT_ACT_66C
        ];
      case 'consumer_deficiency':
        return [
          STATUTE_KNOWLEDGE_BASE.CPA_2019_DEFICIENCY,
          STATUTE_KNOWLEDGE_BASE.BNS_316_CHEATING
        ];
      case 'cyber_stalking_harassment':
        return [
          STATUTE_KNOWLEDGE_BASE.BNS_78_STALKING,
          STATUTE_KNOWLEDGE_BASE.IT_ACT_66D,
          STATUTE_KNOWLEDGE_BASE.BNS_351_INTIMIDATION
        ];
      case 'cheque_bounce_financial':
        return [
          STATUTE_KNOWLEDGE_BASE.NI_ACT_138,
          STATUTE_KNOWLEDGE_BASE.BNS_316_CHEATING
        ];
      default:
        return [
          STATUTE_KNOWLEDGE_BASE.BNS_316_CHEATING,
          STATUTE_KNOWLEDGE_BASE.BNS_351_INTIMIDATION
        ];
    }
  }

  private static getStepsForCategory(category: LegalCategory) {
    switch (category) {
      case 'online_financial_fraud':
        return [
          {
            id: 'step_1',
            stepNumber: 1,
            title: 'Call 1930 Golden Hour National Cyber Fraud Helpline',
            description: 'Dial 1930 immediately with your transaction UTR number, bank account, and time of debit. The National Cybercrime Portal will dispatch an emergency lien instruction to freeze funds at the beneficiary bank/wallet.',
            timeline: 'Immediately (Within 2 - 4 hours)',
            urgency: 'immediate' as const,
            authorityName: 'Citizen Financial Cyber Fraud Reporting System (MHA)',
            authorityUrl: 'https://cybercrime.gov.in',
            evidenceRequired: ['Bank Debit SMS', 'UPI UTR Number', 'Scammer Phone Number / UPI ID', 'Call Recording / Screenshot'],
            tips: ['Do not delete any chat or SMS evidence.', 'Note down the National Cybercrime acknowledgement number.']
          },
          {
            id: 'step_2',
            stepNumber: 2,
            title: 'File Formal Dispute with Your Home Bank & Block Cards/UPI',
            description: 'Visit your home bank branch or submit an unauthorized electronic transaction grievance. As per RBI Master Circular on Limited Liability of Customers (2017), zero customer liability applies if reported within 3 days.',
            timeline: 'Within 24 Hours',
            urgency: 'within_24h' as const,
            authorityName: 'Bank Nodal Grievance Officer / Banking Ombudsman',
            authorityUrl: 'https://cms.rbi.org.in',
            evidenceRequired: ['Written Dispute Form', 'FIR / Cyber Complaint Copy', 'Bank Statement showing debit'],
            tips: ['Obtain a formal acknowledgement receipt with inward seal from the branch manager.']
          },
          {
            id: 'step_3',
            stepNumber: 3,
            title: 'File Online FIR on National Cyber Crime Portal',
            description: 'Log on to cybercrime.gov.in and register an incident under "Financial Fraud" with detailed transaction trail.',
            timeline: 'Within 48 Hours',
            urgency: 'within_7_days' as const,
            authorityName: 'District Cyber Crime Police Station',
            authorityUrl: 'https://cybercrime.gov.in',
            evidenceRequired: ['Cyber Complaint PDF', 'Aadhaar / Identity Proof', 'Account Statement'],
            tips: ['Keep copies of the generated NCRP Incident ID for bank insurance claims.']
          }
        ];

      case 'property_landlord_dispute':
        return [
          {
            id: 'step_1',
            stepNumber: 1,
            title: 'Collate Handover Proof & Exit Inspection Documentation',
            description: 'Gather your signed lease agreement, proof of security deposit transfer (bank statement/UPI receipt), rent payment receipts, handover photos/videos, and notice of vacation email/message.',
            timeline: 'Day 1 - 2',
            urgency: 'within_7_days' as const,
            authorityName: 'Documentation Preparation',
            evidenceRequired: ['Rental Agreement', 'Bank statement showing deposit transfer', 'Handover WhatsApp chats / emails', 'Vacation photos'],
            tips: ['Ensure photos show clean condition of walls, fixtures, and meters.']
          },
          {
            id: 'step_2',
            stepNumber: 2,
            title: 'Issue Formal Statutory Demand Legal Notice',
            description: 'Send a formal Legal Demand Notice via Registered Post with Acknowledgment Due (RPAD) and email, demanding refund of the deposit within 15 days, citing criminal breach of trust under BNS Section 303.',
            timeline: 'Day 3 - 7',
            urgency: 'within_7_days' as const,
            authorityName: 'Legal Notice to Landlord',
            evidenceRequired: ['Legal Notice Draft', 'Postal RPAD Receipt', 'Delivery Tracking Report'],
            tips: ['Keep the postal tracking printout showing "Item Delivered" as conclusive legal service proof.']
          },
          {
            id: 'step_3',
            stepNumber: 3,
            title: 'File Petition before Rent Authority / RERA or Consumer Forum',
            description: 'If the landlord fails to refund within the 15-day notice window, file an application before the State Rent Authority under Tenancy Act or file for unfair trade practice before the District Consumer Commission.',
            timeline: 'After 15 Days of Notice',
            urgency: 'within_30_days' as const,
            authorityName: 'Rent Court / District Consumer Redressal Commission',
            authorityUrl: 'https://edaakhil.nic.in',
            evidenceRequired: ['Served Legal Notice', 'Postal Delivery Confirmation', 'Rental Agreement'],
            tips: ['Claim 12% to 18% p.a. penal interest for unauthorized withholding along with litigation costs.']
          }
        ];

      case 'consumer_deficiency':
        return [
          {
            id: 'step_1',
            stepNumber: 1,
            title: 'Escalate to National Consumer Helpline (NCH) 1915',
            description: 'Register a grievance on the NCH portal (consumerhelpline.gov.in) or call 1915. Major e-commerce platforms and brand OEMs are converged partners with mandated 15-day resolution windows.',
            timeline: 'Day 1 - 3',
            urgency: 'within_7_days' as const,
            authorityName: 'National Consumer Helpline (DoCA)',
            authorityUrl: 'https://consumerhelpline.gov.in',
            evidenceRequired: ['Order Invoice', 'Unboxing Video / Defect Photos', 'Customer Care Chat Transcripts', 'Packaging Labels'],
            tips: ['Mention your NCH Docket ID in all communications with the brand.']
          },
          {
            id: 'step_2',
            stepNumber: 2,
            title: 'Serve Formal Pre-Litigation Legal Notice',
            description: 'Issue a 15-day statutory pre-litigation notice to the registered office of the company and marketplace intermediary, demanding replacement or full refund plus compensation for deficiency of service under CPA 2019.',
            timeline: 'Day 7 - 14',
            urgency: 'within_7_days' as const,
            authorityName: 'Company Grievance Officer & Marketplace Legal Cell',
            evidenceRequired: ['Notice Draft', 'Proof of delivery via Email / RPAD'],
            tips: ['Address both the seller and the e-commerce intermediary.']
          },
          {
            id: 'step_3',
            stepNumber: 3,
            title: 'File e-Daakhil Consumer Complaint Online',
            description: 'File an online complaint via e-Daakhil (edaakhil.nic.in) before the District Consumer Disputes Redressal Commission having jurisdiction over your place of residence.',
            timeline: 'Within 2 Years from cause of action',
            urgency: 'within_30_days' as const,
            authorityName: 'District Consumer Commission (via e-Daakhil)',
            authorityUrl: 'https://edaakhil.nic.in',
            evidenceRequired: ['e-Daakhil Petition', 'Tax Invoice', 'Defect Proof', 'Legal Notice & postal proof'],
            tips: ['Under CPA 2019 Section 34, you can file from your current city of residence without traveling to the seller\'s city.']
          }
        ];

      case 'cheque_bounce_financial':
        return [
          {
            id: 'step_1',
            stepNumber: 1,
            title: 'Obtain Original Bank Return Memo with Insufficiency Reason',
            description: 'Collect the original dishonored cheque along with the official Bank Cheque Return Memo stating "Funds Insufficient" or "Account Closed". The statutory limitation begins on the date you receive this memo.',
            timeline: 'Within 3 days of bounce',
            urgency: 'immediate' as const,
            authorityName: 'Your Presenting Bank Branch',
            evidenceRequired: ['Original Cheque', 'Bank Return Memo', 'Invoice / Promissory Note proving legally enforceable debt'],
            tips: ['Do not overwrite or mark anything on the original return memo.']
          },
          {
            id: 'step_2',
            stepNumber: 2,
            title: 'Send Mandatory 15-Day Statutory Legal Demand Notice',
            description: 'Issue a formal demand notice under Section 138(b) of the Negotiable Instruments Act within strictly 30 days of receiving the memo, giving the drawer 15 clear days to make payment.',
            timeline: 'Strictly Within 30 Days of Return Memo',
            urgency: 'within_7_days' as const,
            authorityName: 'Drawer / Defaulter via Speed Post / RPAD',
            evidenceRequired: ['Section 138 Notice', 'Speed Post / RPAD Receipt', 'Consignment Delivery Tracking Report'],
            tips: ['If payment is not made within 15 days of notice delivery, the criminal cause of action arises on the 16th day.']
          },
          {
            id: 'step_3',
            stepNumber: 3,
            title: 'File Criminal Complaint before Judicial Magistrate (Within 30 Days)',
            description: 'File a private criminal complaint under Section 138 NI Act before the Judicial Magistrate / Metropolitan Magistrate court having jurisdiction where your bank account is located.',
            timeline: 'Within 30 days of expiry of 15-day notice window',
            urgency: 'within_30_days' as const,
            authorityName: 'Judicial Magistrate First Class (JMFC) Court',
            authorityUrl: 'https://services.ecourts.gov.in',
            evidenceRequired: ['Court Complaint', 'Affidavit of Evidence', 'Original Cheque & Memo', 'Served Notice & Tracking'],
            tips: ['Under Section 143A NI Act, you can pray for interim compensation of up to 20% of the cheque amount during trial.']
          }
        ];

      default:
        return [
          {
            id: 'step_1',
            stepNumber: 1,
            title: 'Preserve and Organize All Documentary Evidence',
            description: 'Create a chronological record of events, preserving all relevant contracts, receipts, communications, and identity documents.',
            timeline: 'Immediate',
            urgency: 'within_7_days' as const,
            authorityName: 'Evidence Organization',
            evidenceRequired: ['Written records', 'Photos / Audio / Video', 'Payment Receipts'],
            tips: ['Back up digital evidence to secure cloud storage.']
          },
          {
            id: 'step_2',
            stepNumber: 2,
            title: 'Issue Formal Legal Notice Demanding Redressal',
            description: 'Send a formal demand notice providing 15 days to resolve the grievance amicably before initiating court proceedings.',
            timeline: 'Within 7 - 10 Days',
            urgency: 'within_7_days' as const,
            authorityName: 'Opposite Party',
            evidenceRequired: ['Legal Notice Draft', 'Registered Post Receipt'],
            tips: ['Clearly specify the legal provisions and timeframe.']
          },
          {
            id: 'step_3',
            stepNumber: 3,
            title: 'Approach Appropriate Statutory Forum or NALSA Free Legal Aid',
            description: 'If dispute remains unresolved, file an application in the competent court or seek free legal assistance through NALSA portal.',
            timeline: 'Within Limitation Period',
            urgency: 'within_30_days' as const,
            authorityName: 'District Court / NALSA Legal Aid Clinic',
            authorityUrl: 'https://nalsa.gov.in',
            evidenceRequired: ['Complaint Petition', 'Served Notice', 'Evidence Dossier'],
            tips: ['Citizens with income under statutory limits or women/SC/ST are entitled to free legal counsel under Article 39A.']
          }
        ];
    }
  }

  private static getAuthoritiesForCategory(category: LegalCategory): LegalAuthorityContact[] {
    switch (category) {
      case 'online_financial_fraud':
        return [
          {
            name: 'National Cyber Crime Reporting Portal (MHA)',
            type: 'cyber_cell',
            phone: OFFICIAL_HELPLINES.CYBER_FRAUD.number,
            portalUrl: OFFICIAL_HELPLINES.CYBER_FRAUD.portal,
            description: 'Nodal authority for financial cyber frauds, account freeze and investigation.',
            procedure: 'Dial 1930 within Golden Hour or log in with mobile OTP on cybercrime.gov.in to submit transaction trail.'
          },
          {
            name: 'RBI Integrated Ombudsman Scheme',
            type: 'police',
            phone: '14448',
            portalUrl: 'https://cms.rbi.org.in',
            description: 'Statutory ombudsman for deficiency in banking services and unauthorized digital transactions.',
            procedure: 'File online complaint with ticket number from your bank after 30 days or on rejection.'
          }
        ];
      case 'property_landlord_dispute':
        return [
          {
            name: 'State Real Estate Regulatory Authority (RERA) / Rent Control Authority',
            type: 'rera',
            phone: '1800-1200-RERA',
            description: 'Statutory authority adjudicating tenancy agreements and security deposit returns.',
            procedure: 'File Form M / Tenancy Dispute application with rental agreement and proof of deposit.'
          },
          {
            name: 'District Consumer Disputes Redressal Commission',
            type: 'consumer_forum',
            portalUrl: 'https://edaakhil.nic.in',
            description: 'Jurisdiction over rental service providers and commercial deposit disputes.',
            procedure: 'Register online on e-Daakhil with legal notice delivery proof.'
          }
        ];
      case 'consumer_deficiency':
        return [
          {
            name: 'National Consumer Helpline (NCH - DoCA)',
            type: 'consumer_forum',
            phone: OFFICIAL_HELPLINES.CONSUMER.number,
            portalUrl: OFFICIAL_HELPLINES.CONSUMER.portal,
            description: 'Government conciliation portal for pre-litigation dispute resolution with consumer brands.',
            procedure: 'Call 1915 or SMS 8800001915 or register on consumerhelpline.gov.in with invoice details.'
          },
          {
            name: 'e-Daakhil Online Consumer Court Portal',
            type: 'consumer_forum',
            portalUrl: 'https://edaakhil.nic.in',
            description: 'Digitized platform for filing consumer cases in District, State, and National commissions.',
            procedure: 'Sign up with Aadhaar verification, upload petition PDF, and pay nominal court fee via Bharatkosh.'
          }
        ];
      default:
        return [
          {
            name: 'National Legal Services Authority (NALSA)',
            type: 'legal_aid',
            phone: OFFICIAL_HELPLINES.LEGAL_AID.number,
            portalUrl: OFFICIAL_HELPLINES.LEGAL_AID.portal,
            description: 'Constitutional free legal aid body offering empanelled advocates at state expense.',
            procedure: 'Apply via nalsa.gov.in or visit the District Legal Services Authority (DLSA) at your District Court.'
          }
        ];
    }
  }

  private static getPrecedentsForCategory(category: LegalCategory): PrecedentSummary[] {
    switch (category) {
      case 'property_landlord_dispute':
        return [
          {
            caseTitle: 'Suresh Kumar v. State of Karnataka & Anr.',
            citation: '2022 SCC OnLine Kar 1420',
            court: 'High Court of Karnataka',
            year: 2022,
            keyTakeaway: 'Arbitrary withholding of security deposit after tenant delivers vacant possession constitutes criminal breach of trust under law.',
            ratioDecidendi: 'Security deposit is held in fiduciary capacity for specific indemnity against actual physical damage; landlord cannot withhold without itemized assessment.'
          },
          {
            caseTitle: 'R. K. Sharma v. Modern Properties Ltd.',
            citation: '(2019) CPJ 284 (NC)',
            court: 'National Consumer Disputes Redressal Commission',
            year: 2019,
            keyTakeaway: 'Landlord ordered to refund security deposit with 12% per annum compound interest and compensation for harassment.',
            ratioDecidendi: 'Failure to refund deposit upon end of tenancy amounts to severe deficiency of service.'
          }
        ];
      case 'online_financial_fraud':
        return [
          {
            caseTitle: 'Punjab National Bank v. Leader Valves Ltd.',
            citation: '2020 SCC OnLine NCDRC 188',
            court: 'National Consumer Commission',
            year: 2020,
            keyTakeaway: 'Bank is liable to reimburse unauthorized electronic transfers if customer intimates within 3 days under RBI guidelines.',
            ratioDecidendi: 'Banks maintain strict duty of care in multi-factor authentication; failure to prevent unauthorized routing fixes liability upon the banking system.'
          }
        ];
      case 'consumer_deficiency':
        return [
          {
            caseTitle: 'Amazon Seller Services Pvt. Ltd. v. Gopal Sharma',
            citation: '2021 SCC OnLine NCDRC 45',
            court: 'National Consumer Disputes Redressal Commission',
            year: 2021,
            keyTakeaway: 'E-commerce marketplace cannot escape liability under intermediary safe harbor if defective goods delivered are not refunded.',
            ratioDecidendi: 'Platforms facilitating financial transactions and consumer fulfillment hold joint liability for product deficiency.'
          }
        ];
      case 'cheque_bounce_financial':
        return [
          {
            caseTitle: 'Kishan Rao v. Shankargouda',
            citation: '(2018) 8 SCC 165',
            court: 'Supreme Court of India',
            year: 2018,
            keyTakeaway: 'Statutory presumption under Section 139 of NI Act is mandatory in favor of the holder of a bounced cheque.',
            ratioDecidendi: 'Once the cheque signature is admitted, the burden of proof strictly lies on the drawer to disprove the existence of a legally enforceable debt.'
          }
        ];
      default:
        return [
          {
            caseTitle: 'Hussainara Khatoon v. Home Secretary, State of Bihar',
            citation: '(1980) 1 SCC 81',
            court: 'Supreme Court of India',
            year: 1980,
            keyTakeaway: 'Right to free legal aid is an inalienable fundamental right under Article 21 and Article 39A of the Constitution of India.',
            ratioDecidendi: 'State has constitutional obligation to provide speedy and affordable justice to every citizen.'
          }
        ];
    }
  }

  private static getLimitationPeriod(category: LegalCategory): string {
    switch (category) {
      case 'cheque_bounce_financial':
        return 'Strictly 30 days from Bank Return Memo for Notice; 30 days post 15-day notice expiry for Court Complaint.';
      case 'online_financial_fraud':
        return 'Immediate Golden Hour (within 24h) for 1930 Freeze; 3 days for RBI Zero Customer Liability.';
      case 'consumer_deficiency':
        return '2 Years from the date of cause of action (Invoice/Refusal) under Section 69 of CPA 2019.';
      case 'property_landlord_dispute':
        return '3 Years under Limitation Act, 1963 for recovery of money (Notice recommended within 15-30 days).';
      default:
        return '3 Years from the date of cause of action under Indian Limitation Act, 1963.';
    }
  }

  private static getStatutoryNoticeTimeframe(category: LegalCategory): string {
    switch (category) {
      case 'cheque_bounce_financial':
        return '15 Days Statutory Notice under Section 138(b) Negotiable Instruments Act.';
      case 'property_landlord_dispute':
        return '15 Days Final Demand Notice under BNS Section 303 & State Tenancy Laws.';
      case 'consumer_deficiency':
        return '15 Days Pre-Litigation Notice under Consumer Protection Act, 2019.';
      default:
        return '15 Days Formal Demand Notice prior to initiating legal proceedings.';
    }
  }

  private static generateExecutiveSummary(category: LegalCategory, query: string): string {
    const preview = query.slice(0, 120);
    switch (category) {
      case 'property_landlord_dispute':
        return `Landlord-tenant dispute involving unlawful withholding of tenancy security deposit. Prima facie actionable under Bharatiya Nyaya Sanhita (BNS 2023) Section 303 (Criminal Breach of Trust) and State Tenancy / Consumer protection statutes.`;
      case 'online_financial_fraud':
        return `Unauthorized electronic fund siphoning / cyber impersonation fraud. Prima facie actionable under Section 66D of Information Technology Act, 2000 and Section 318(4) of BNS 2023. Urgent reporting required on 1930 helpline.`;
      case 'consumer_deficiency':
        return `Consumer dispute regarding delivery of defective merchandise / refusal of warranty refund. Prima facie actionable under Section 2(11) & Section 35 of Consumer Protection Act, 2019 against seller and e-commerce marketplace.`;
      case 'cheque_bounce_financial':
        return `Dishonor of negotiable instrument due to insufficiency of funds. Strict statutory procedure under Section 138 of Negotiable Instruments Act, 1881 applicable with 30-day notice limitation.`;
      case 'cyber_stalking_harassment':
        return `Online harassment / digital stalking via social channels. Actionable under Section 78 of Bharatiya Nyaya Sanhita (BNS 2023) and Section 66E/67 of IT Act, 2000.`;
      default:
        return `Civil / criminal grievance requiring systematic legal triage under relevant Indian statutory enactments and formal demand notice protocol.`;
    }
  }

  public static generateNoticeDraft(category: LegalCategory, data: TriageFormData): LegalNoticeData {
    const today = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
    
    let subject = 'LEGAL DEMAND NOTICE FOR RESOLUTION OF DISPUTE';
    let demands = ['Refund the outstanding balance of ₹50,000 within 15 days of this notice.'];
    let facts = [
      'That the Complainant and the Addressee entered into a valid and lawful agreement.',
      'That the Complainant fulfilled all contractual and statutory obligations without default.',
      `That on or about the relevant dates, the Addressee committed breach causing financial loss and harassment: "${data.query.slice(0, 180)}..."`
    ];

    if (category === 'property_landlord_dispute') {
      subject = 'FINAL LEGAL NOTICE: DEMAND FOR IMMEDIATE REFUND OF TENANCY SECURITY DEPOSIT WITH INTEREST UNDER BNS SECTION 303';
      facts = [
        'That my client resided as a lawful tenant at the scheduled residential premises pursuant to the Lease Agreement.',
        'That my client delivered peaceful and vacant possession of the premises after giving due notice, with zero arrears of rent or utility bills.',
        'That despite joint inspection and clear handover, you have unlawfully and dishonestly withheld the security deposit in gross violation of tenancy laws.'
      ];
      demands = [
        'Immediately refund the full security deposit along with interest @ 18% per annum from the date of vacation.',
        'Pay a sum of ₹25,000 towards mental agony and legal drafting expenses incurred by my client.',
        'Take notice that failure to comply within 15 days will compel initiation of criminal proceedings under BNS Section 303/316 and civil recovery petitions.'
      ];
    } else if (category === 'consumer_deficiency') {
      subject = 'STATUTORY PRE-LITIGATION NOTICE UNDER SECTION 35 OF CONSUMER PROTECTION ACT, 2019 FOR DEFICIENCY OF SERVICE';
      facts = [
        'That the consumer purchased the subject product/service relying upon the express representations of quality and warranty.',
        'That the product delivered was found defective / inoperable and reported immediately within the allowable return/replacement window.',
        'That your customer care and grievance desk arbitrarily refused resolution, constituting unfair trade practice.'
      ];
      demands = [
        'Provide immediate replacement of the defective product with a new sealed unit OR full refund of the invoice amount.',
        'Pay ₹15,000 towards compensation for harassment, deficiency of service, and litigation costs.'
      ];
    } else if (category === 'cheque_bounce_financial') {
      subject = 'STATUTORY DEMAND NOTICE UNDER CLAUSE (b) OF PROVISO TO SECTION 138 OF NEGOTIABLE INSTRUMENTS ACT, 1881';
      facts = [
        'That you issued the subject cheque drawn on your bank account towards discharge of legally enforceable debt and liability.',
        'That the said cheque was presented for clearance within validity period but was returned unpaid by the bank with memo stating "Funds Insufficient".',
        'That the statutory bank return memo was received and this notice is issued strictly within the 30-day limitation period.'
      ];
      demands = [
        'Make full payment of the cheque amount within 15 (fifteen) clear days from receipt of this notice.',
        'Take notice that in default, criminal proceedings under Section 138 and 141 of Negotiable Instruments Act will be filed before the competent Magistrate Court.'
      ];
    }

    return {
      senderName: '[Your Name / Complainant]',
      senderAddress: '[Your Full Address, City, Pincode]',
      senderPhone: '[Your Phone / Email]',
      receiverName: '[Opposite Party Name / Landlord / Company Name]',
      receiverAddress: '[Opposite Party Registered Office / Residential Address]',
      subject,
      facts,
      demands,
      statutoryNoticeDays: 15,
      draftedDate: today
    };
  }
}
