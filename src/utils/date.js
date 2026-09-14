export function formatDate(
  dateInput,
  { fallback = "—", monthStyle = "long" } = {}
) {
  if (!dateInput) return fallback;
  try {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return String(dateInput);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: monthStyle,
      day: "numeric",
    });
  } catch {
    return String(dateInput);
  }
}