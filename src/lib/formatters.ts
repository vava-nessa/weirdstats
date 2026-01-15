/**
 * Formats a number with K/M suffixes for readability
 * @param num - The number to format
 * @returns Formatted string with suffix
 * @example formatNumber(1500) // "1.5K"
 * @example formatNumber(1500000) // "1.5M"
 */
export function formatNumber(num: number): string {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + 'M'
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + 'K'
  }
  return Math.floor(num).toString()
}

/**
 * Formats a number with thousand separators
 * @param num - The number to format
 * @returns Formatted string with spaces as thousand separators
 * @example formatWithSpaces(1234567) // "1 234 567"
 */
export function formatWithSpaces(num: number): string {
  return Math.floor(num)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

/**
 * Formats elapsed time in seconds to HH:MM:SS format
 * @param seconds - Number of seconds elapsed
 * @returns Formatted time string
 * @example formatTime(3661) // "01:01:01"
 */
export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)
  
  return [hours, minutes, secs]
    .map((val) => val.toString().padStart(2, '0'))
    .join(':')
}
