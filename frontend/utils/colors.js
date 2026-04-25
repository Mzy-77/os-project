const PROCESS_COLORS = [
  "#e05c5c", "#e0905c", "#d4c84a", "#5cb85c", "#5cb8d4",
  "#5c7de0", "#a05ce0", "#e05cb8", "#7de05c", "#5ce0c8"
];

export function getColor(id, allIds) {
  const idx = allIds.indexOf(id);
  return PROCESS_COLORS[idx % PROCESS_COLORS.length];
}