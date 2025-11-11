/**
 * Buffer type definitions
 * 
 * These types are used by the renderer for backward compatibility.
 * The actual terminal buffer is now implemented in WASM (GhosttyTerminal).
 */

/** Color types for rendering */
export type CellColor = 
  | { type: 'default' }
  | { type: 'palette'; index: number }
  | { type: 'rgb'; r: number; g: number; b: number };

/** Cell represents a single character position for rendering */
export interface Cell {
  char: string;              // The character (may be multi-byte UTF-8)
  width: number;             // 1 for normal, 2 for wide (CJK/emoji), 0 for combining
  fg: CellColor;
  bg: CellColor;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  inverse: boolean;
  invisible: boolean;
  strikethrough: boolean;
  faint: boolean;
  blink: boolean;
}
