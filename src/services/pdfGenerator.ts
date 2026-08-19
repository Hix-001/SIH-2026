import jsPDF from 'jspdf';
import { LegalNoticeData, TriageResult } from '../types/legal.types';

export class PDFGeneratorService {
  /**
   * Generate and trigger download for formal Legal Demand Notice PDF
   */
  public static downloadLegalNoticePDF(notice: LegalNoticeData): void {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    let yPos = 25;

    // Header / Border
    doc.setDrawColor(26, 35, 126); // Judiciary blue
    doc.setLineWidth(1);
    doc.line(margin, 15, pageWidth - margin, 15);

    // Title
    doc.setFont('times', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(26, 35, 126);
    doc.text('FORMAL LEGAL DEMAND NOTICE', pageWidth / 2, yPos, { align: 'center' });
    yPos += 6;

    doc.setFontSize(10);
    doc.setFont('times', 'italic');
    doc.setTextColor(100, 100, 100);
    doc.text('(ISSUED UNDER REGISTERED POST WITH ACKNOWLEDGEMENT DUE / SPEED POST)', pageWidth / 2, yPos, { align: 'center' });
    yPos += 12;

    // Date
    doc.setFont('times', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(20, 20, 20);
    doc.text(`Date: ${notice.draftedDate}`, pageWidth - margin, yPos, { align: 'right' });
    yPos += 8;

    // Sender Details
    doc.setFont('times', 'bold');
    doc.text('FROM / SENDER:', margin, yPos);
    yPos += 5;
    doc.setFont('times', 'normal');
    doc.text(`${notice.senderName}`, margin, yPos);
    yPos += 5;
    const senderAddressLines = doc.splitTextToSize(notice.senderAddress, contentWidth / 2);
    doc.text(senderAddressLines, margin, yPos);
    yPos += (senderAddressLines.length * 4.5) + 2;
    doc.text(`Contact: ${notice.senderPhone}`, margin, yPos);
    yPos += 8;

    // Receiver Details
    doc.setFont('times', 'bold');
    doc.text('TO / ADDRESSEE:', margin, yPos);
    yPos += 5;
    doc.setFont('times', 'normal');
    doc.text(`${notice.receiverName}`, margin, yPos);
    yPos += 5;
    const receiverAddressLines = doc.splitTextToSize(notice.receiverAddress, contentWidth / 2);
    doc.text(receiverAddressLines, margin, yPos);
    yPos += (receiverAddressLines.length * 4.5) + 6;

    // Subject
    doc.setFont('times', 'bold');
    doc.setTextColor(26, 35, 126);
    const subjectLines = doc.splitTextToSize(`SUBJECT: ${notice.subject}`, contentWidth);
    doc.text(subjectLines, margin, yPos);
    yPos += (subjectLines.length * 5) + 5;

    // Salutation
    doc.setFont('times', 'normal');
    doc.setTextColor(20, 20, 20);
    doc.text('Sir / Madam,', margin, yPos);
    yPos += 6;

    doc.text('Under instructions from and on behalf of the Sender named above, this formal legal notice is hereby served upon you stating as follows:', margin, yPos, { maxWidth: contentWidth });
    yPos += 10;

    // Facts Section
    doc.setFont('times', 'bold');
    doc.text('1. STATEMENT OF FACTS:', margin, yPos);
    yPos += 6;

    doc.setFont('times', 'normal');
    notice.facts.forEach((fact, idx) => {
      const factLines = doc.splitTextToSize(`1.${idx + 1}. ${fact}`, contentWidth - 5);
      if (yPos + (factLines.length * 5) > 270) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(factLines, margin + 4, yPos);
      yPos += (factLines.length * 5) + 3;
    });

    yPos += 4;

    // Demands Section
    if (yPos > 240) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFont('times', 'bold');
    doc.text('2. STATUTORY DEMANDS & RECTIFICATION REQUIRED:', margin, yPos);
    yPos += 6;

    doc.setFont('times', 'normal');
    notice.demands.forEach((demand, idx) => {
      const demandLines = doc.splitTextToSize(`2.${idx + 1}. ${demand}`, contentWidth - 5);
      if (yPos + (demandLines.length * 5) > 270) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(demandLines, margin + 4, yPos);
      yPos += (demandLines.length * 5) + 3;
    });

    yPos += 6;

    // Final Warning Notice
    if (yPos > 245) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFont('times', 'bold');
    doc.setTextColor(198, 40, 40); // Justice Red
    const warningText = `TAKE NOTICE that you are hereby called upon to comply with the above demands within strictly ${notice.statutoryNoticeDays} (fifteen) days from the receipt of this notice, failing which my client shall be constrained to initiate appropriate civil, criminal, and statutory proceedings in the competent Courts of Law solely at your risk, cost, and consequence.`;
    const warningLines = doc.splitTextToSize(warningText, contentWidth);
    doc.text(warningLines, margin, yPos);
    yPos += (warningLines.length * 5) + 12;

    // Signature Area
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }

    doc.setTextColor(20, 20, 20);
    doc.setFont('times', 'normal');
    doc.text('Yours faithfully,', margin, yPos);
    yPos += 14;
    doc.setFont('times', 'bold');
    doc.text(`[${notice.senderName}]`, margin, yPos);
    yPos += 4;
    doc.setFont('times', 'italic');
    doc.text('Complainant / Aggrieved Party', margin, yPos);

    // Save
    doc.save(`Legal_Notice_${notice.senderName.replace(/\s+/g, '_')}_${Date.now()}.pdf`);
  }

  /**
   * Download complete Triage Evaluation Report
   */
  public static downloadTriageReportPDF(result: TriageResult): void {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 18;
    const contentWidth = pageWidth - (margin * 2);
    let yPos = 20;

    // Header
    doc.setFillColor(26, 35, 126);
    doc.rect(margin, 12, contentWidth, 18, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(245, 200, 66);
    doc.text('CITIZEN LEGAL TRIAGE & RIGHTS ADVISORY REPORT', pageWidth / 2, 21, { align: 'center' });
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text(`Smart Automation SIH 2026 Prototype | Generated: ${new Date(result.generatedAt).toLocaleString('en-IN')}`, pageWidth / 2, 26, { align: 'center' });
    yPos = 38;

    // Case Details Card
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(26, 35, 126);
    doc.text('1. DISPUTE CLASSIFICATION & ASSESSMENT', margin, yPos);
    yPos += 6;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(50, 50, 50);
    doc.text(`Category: ${result.categoryDisplayName}`, margin, yPos);
    yPos += 5;
    doc.text(`Risk Priority: ${result.riskLevel.toUpperCase()}`, margin, yPos);
    yPos += 5;
    doc.text(`Statutory Notice Timeframe: ${result.statutoryTimeframeNotice}`, margin, yPos);
    yPos += 5;
    doc.text(`Limitation Period: ${result.limitationPeriod}`, margin, yPos);
    yPos += 8;

    // Executive Summary
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(26, 35, 126);
    doc.text('Executive Summary:', margin, yPos);
    yPos += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(40, 40, 40);
    const summaryLines = doc.splitTextToSize(result.summary, contentWidth);
    doc.text(summaryLines, margin, yPos);
    yPos += (summaryLines.length * 4.5) + 6;

    // Applicable Statutes
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(26, 35, 126);
    doc.text('2. APPLICABLE STATUTES & BNS MAPPINGS', margin, yPos);
    yPos += 6;

    result.legalSections.forEach((sec, idx) => {
      if (yPos > 255) {
        doc.addPage();
        yPos = 20;
      }
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(26, 35, 126);
      doc.text(`${idx + 1}. ${sec.act} - ${sec.section}`, margin, yPos);
      yPos += 4.5;
      if (sec.oldIpcSection) {
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(8);
        doc.setTextColor(198, 40, 40);
        doc.text(`   [Equivalent: ${sec.oldIpcSection}]`, margin, yPos);
        yPos += 4;
      }
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(50, 50, 50);
      const descLines = doc.splitTextToSize(`   ${sec.description}`, contentWidth);
      doc.text(descLines, margin, yPos);
      yPos += (descLines.length * 4) + 2;
      doc.setFont('helvetica', 'bold');
      doc.text(`   Punishment: ${sec.punishment} | Cognizable: ${sec.cognizable ? 'Yes' : 'No'} | Bailable: ${sec.bailable ? 'Yes' : 'No'}`, margin, yPos);
      yPos += 6;
    });

    // Action Steps
    if (yPos > 230) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(26, 35, 126);
    doc.text('3. RECOMMENDED ACTION STEPS & TIMELINES', margin, yPos);
    yPos += 6;

    result.actionSteps.forEach((step) => {
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(20, 20, 20);
      doc.text(`Step ${step.stepNumber}: ${step.title} (${step.timeline})`, margin, yPos);
      yPos += 4.5;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(60, 60, 60);
      const stepDesc = doc.splitTextToSize(step.description, contentWidth - 4);
      doc.text(stepDesc, margin + 4, yPos);
      yPos += (stepDesc.length * 4) + 4;
    });

    // Disclaimer
    if (yPos > 260) {
      doc.addPage();
      yPos = 20;
    }
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 5;
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7);
    doc.setTextColor(120, 120, 120);
    doc.text('DISCLAIMER: This automated triage advisory is generated for informational legal guidance only under Smart Automation principles and does not constitute formal advocate representation. For official litigation, consult an empanelled advocate via NALSA (15100).', margin, yPos, { maxWidth: contentWidth });

    doc.save(`NyayaSetu_Triage_Advisory_${result.queryId}.pdf`);
  }
}
