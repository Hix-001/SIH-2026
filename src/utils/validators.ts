export function validateQueryLength(query: string): { isValid: boolean; error?: string } {
  if (!query || query.trim().length === 0) {
    return { isValid: false, error: 'Please enter a description of your legal dispute.' };
  }
  if (query.trim().length < 15) {
    return { isValid: false, error: 'Please provide at least 15 characters for an accurate legal analysis.' };
  }
  return { isValid: true };
}

export function isValidPhoneNumber(phone: string): boolean {
  const cleaned = phone.replace(/[\s-]/g, '');
  return /^(?:\+?91)?[6-9]\d{9}$/.test(cleaned);
}
