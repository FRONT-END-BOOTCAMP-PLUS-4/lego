export function formatDate(dateString?: string): string {
  if (!dateString) return "";
  const formatted = dateString.split("T")[0].replaceAll("-", ".");
  return formatted;
}
