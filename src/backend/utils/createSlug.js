export function createSlug(text) {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, "-")           // Replace spaces and underscores with hyphens
    .replace(/[^\w\-]+/g, "")          // Remove non-word characters except hyphens
    .replace(/\-\-+/g, "-")            // Replace multiple hyphens with single hyphen
    .replace(/^-+/, "")                // Trim hyphens from start
    .replace(/-+$/, "");               // Trim hyphens from end
}
