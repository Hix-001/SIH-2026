export interface PIIRedactionResult {
  originalText: string;
  redactedText: string;
  piiCount: number;
  entities: {
    type: 'phone' | 'aadhaar' | 'pan' | 'email' | 'bank_account' | 'upi' | 'name';
    label: string;
    original: string;
    masked: string;
  }[];
}

export function redactPII(text: string): PIIRedactionResult {
  if (!text) {
    return { originalText: '', redactedText: '', piiCount: 0, entities: [] };
  }

  let scrubbed = text;
  const entities: PIIRedactionResult['entities'] = [];

  // 1. Aadhaar Card Pattern (12 digits with optional hyphens/spaces)
  const aadhaarRegex = /\b[2-9]{1}[0-9]{3}[\s-]?[0-9]{4}[\s-]?[0-9]{4}\b/g;
  scrubbed = scrubbed.replace(aadhaarRegex, (match) => {
    const cleanDigits = match.replace(/[\s-]/g, '');
    const masked = `XXXX-XXXX-${cleanDigits.slice(-4)}`;
    entities.push({
      type: 'aadhaar',
      label: 'Aadhaar ID',
      original: match,
      masked
    });
    return `[AADHAAR_REDACTED: ${masked}]`;
  });

  // 2. PAN Card Pattern (5 alphabets + 4 numbers + 1 alphabet)
  const panRegex = /\b[A-Z]{5}[0-9]{4}[A-Z]{1}\b/g;
  scrubbed = scrubbed.replace(panRegex, (match) => {
    const masked = `${match.slice(0, 3)}****${match.slice(-1)}`;
    entities.push({
      type: 'pan',
      label: 'PAN Card',
      original: match,
      masked
    });
    return `[PAN_REDACTED: ${masked}]`;
  });

  // 3. Indian Mobile Phone Number (10 digits starting with 6, 7, 8, 9, with optional +91/0)
  const phoneRegex = /(?:\+?91[\s-]?)?[6-9]\d{9}\b/g;
  scrubbed = scrubbed.replace(phoneRegex, (match) => {
    const digitsOnly = match.replace(/\D/g, '');
    const last4 = digitsOnly.slice(-4);
    const masked = `+91 98****${last4}`;
    entities.push({
      type: 'phone',
      label: 'Phone Number',
      original: match,
      masked
    });
    return `[PHONE_REDACTED: ${masked}]`;
  });

  // 4. Email Address
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b/g;
  scrubbed = scrubbed.replace(emailRegex, (match) => {
    const parts = match.split('@');
    const userPart = parts[0];
    const domainPart = parts[1];
    const maskedUser = userPart.length > 2 ? `${userPart[0]}***${userPart.slice(-1)}` : '***';
    const masked = `${maskedUser}@${domainPart}`;
    entities.push({
      type: 'email',
      label: 'Email Address',
      original: match,
      masked
    });
    return `[EMAIL_REDACTED: ${masked}]`;
  });

  // 5. UPI ID (e.g. name@okhdfcbank, user@paytm, abc@ybl, xyz@upi)
  const upiRegex = /\b[a-zA-Z0-9.\-_]{3,}@(okhdfcbank|okaxis|oksbi|okicici|paytm|ybl|ibl|axl|upi|sbi|hdfcbank|icici)\b/gi;
  scrubbed = scrubbed.replace(upiRegex, (match) => {
    const [handle, provider] = match.split('@');
    const masked = `${handle.slice(0, 2)}***@${provider}`;
    entities.push({
      type: 'upi',
      label: 'UPI Virtual Handle',
      original: match,
      masked
    });
    return `[UPI_REDACTED: ${masked}]`;
  });

  // 6. Bank Account Numbers (keyword preceded by A/C or account number)
  const bankAccRegex = /(?:a\/c|account\s*(?:no\.?|number)?[:\s]*)(\d{9,18})/gi;
  scrubbed = scrubbed.replace(bankAccRegex, (match, accNum) => {
    const masked = `A/C ******${accNum.slice(-4)}`;
    entities.push({
      type: 'bank_account',
      label: 'Bank Account No.',
      original: accNum,
      masked
    });
    return `[BANK_ACCOUNT_REDACTED: ${masked}]`;
  });

  return {
    originalText: text,
    redactedText: scrubbed,
    piiCount: entities.length,
    entities
  };
}
