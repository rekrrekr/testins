export function tagsToCsv(tags: string[]) {
  return tags.map((t) => t.trim()).filter(Boolean).join(',');
}

export function csvToTags(csv: string | null | undefined) {
  if (!csv) return [] as string[];
  return csv.split(',').map((t) => t.trim()).filter(Boolean);
}