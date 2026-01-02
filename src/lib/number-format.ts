/**
 * Format a number with space as thousands separator
 * Example: 150000 -> "150 000"
 */
export function formatNumberWithSpaces(value: number | string): string {
  if (value === '' || value === null || value === undefined) {
    return '';
  }
  
  // Convert to string and remove any existing formatting
  const numStr = String(value).replace(/\s/g, '');
  
  // Parse as number
  const num = parseFloat(numStr);
  
  // Return empty string if not a valid number
  if (isNaN(num)) {
    return '';
  }
  
  // Format with space as thousands separator
  return num.toLocaleString('hu-HU', {
    useGrouping: true,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).replace(/,/g, ' '); // Replace comma with space for Hungarian format
}

/**
 * Parse a formatted number string back to a number
 * Example: "150 000" -> 150000
 */
export function parseFormattedNumber(value: string): number {
  if (!value || value.trim() === '') {
    return 0;
  }
  
  // Remove all spaces and parse
  const cleaned = value.replace(/\s/g, '');
  const parsed = parseFloat(cleaned);
  
  return isNaN(parsed) ? 0 : parsed;
}



