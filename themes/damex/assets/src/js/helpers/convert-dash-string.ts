/**
 * Remove dashes from string and upper case first letters.
 */
export function convertDashString(phrase: string): string {
  const EMPTY_STRING = " ";
  const DASH = "-";

  return phrase
    .replace(DASH, EMPTY_STRING)
    .split(EMPTY_STRING)
    .map((part) => part.charAt(0).toUpperCase() + part.substring(1, part.length))
    .join(EMPTY_STRING);
}
