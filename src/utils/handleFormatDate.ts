export function formatDate(dateString: string): string {
  const formatted = dateString.split("T")[0].replaceAll("-", ".");
  return formatted;
}
