export function formatCurrency(amount: number | string): string {
  const num = typeof amount === 'string' ? parseFloat(amount.replace(/[^0-9.-]+/g, '')) : amount;
  if (isNaN(num)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(num);
}

export function formatDate(dateString: string | Date): string {
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  if (isNaN(date.getTime())) return 'N/A';
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date);
}

export function truncateText(text: string, maxLength: number = 100): string {
  if (!text || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

export function getRiskColorClass(level: 'low' | 'moderate' | 'high' | 'critical'): {
  bg: string;
  text: string;
  border: string;
  label: string;
} {
  switch (level) {
    case 'critical':
      return {
        bg: 'bg-red-500/10 dark:bg-red-950/40',
        text: 'text-red-600 dark:text-red-400',
        border: 'border-red-500/30',
        label: 'CRITICAL URGENCY'
      };
    case 'high':
      return {
        bg: 'bg-amber-500/10 dark:bg-amber-950/40',
        text: 'text-amber-600 dark:text-amber-400',
        border: 'border-amber-500/30',
        label: 'HIGH PRIORITY'
      };
    case 'moderate':
      return {
        bg: 'bg-blue-500/10 dark:bg-blue-950/40',
        text: 'text-blue-600 dark:text-blue-400',
        border: 'border-blue-500/30',
        label: 'MODERATE PRIORITY'
      };
    case 'low':
    default:
      return {
        bg: 'bg-emerald-500/10 dark:bg-emerald-950/40',
        text: 'text-emerald-600 dark:text-emerald-400',
        border: 'border-emerald-500/30',
        label: 'INFORMATIONAL'
      };
  }
}
