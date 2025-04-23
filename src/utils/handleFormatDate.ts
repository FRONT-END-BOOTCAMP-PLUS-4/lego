export function formatDate(dateString: string): string | undefined {
  if (!dateString) return;
  const formatted = dateString.split("T")[0].replaceAll("-", ".");
  return formatted;
}
