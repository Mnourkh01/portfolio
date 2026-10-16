export type ColorToken = {
  id: string;
  name: string;
  cssVar: string;
  hex: string;
};

export const colorTokens: ColorToken[] = [
  { id: "canvas", name: "Canvas", cssVar: "--canvas", hex: "#EDEBE7" },
  { id: "frame", name: "Frame", cssVar: "--frame", hex: "#FFFFFF" },
  { id: "ink", name: "Ink", cssVar: "--ink", hex: "#111111" },
  { id: "ink-2", name: "Ink 2", cssVar: "--ink-2", hex: "#3B3935" },
  { id: "ink-3", name: "Ink 3", cssVar: "--ink-3", hex: "#5E5A54" },
  { id: "line", name: "Line", cssVar: "--line", hex: "#DCD8D1" },
  { id: "accent", name: "Accent", cssVar: "--accent", hex: "#F5A300" },
  { id: "accent-ink", name: "Accent ink", cssVar: "--accent-ink", hex: "#8A5A00" },
  { id: "cursor-me", name: "Cursor / Me", cssVar: "--cursor-me", hex: "#00A88F" },
  { id: "cursor-you", name: "Cursor / You", cssVar: "--cursor-you", hex: "#2F6BFF" },
  { id: "note-amber", name: "Note / Amber", cssVar: "--note-amber", hex: "#FFE7A8" },
  { id: "note-teal", name: "Note / Teal", cssVar: "--note-teal", hex: "#CFEFE6" },
];

export function tokenHex(id: string): string {
  const token = colorTokens.find((t) => t.id === id);
  if (!token) throw new Error(`Unknown colour token: ${id}`);
  return token.hex;
}
