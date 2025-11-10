/**
 * TypeScript type definitions for libghostty-vt WASM API
 * Based on include/ghostty/vt/*.h from Ghostty repository
 */

// ============================================================================
// SGR (Select Graphic Rendition) Types
// ============================================================================

/**
 * SGR attribute tags - identifies the type of attribute
 * From include/ghostty/vt/sgr.h
 */
export enum SgrAttributeTag {
  UNSET = 0,
  UNKNOWN = 1,
  BOLD = 2,
  RESET_BOLD = 3,
  ITALIC = 4,
  RESET_ITALIC = 5,
  FAINT = 6,
  RESET_FAINT = 7,
  UNDERLINE = 8,
  RESET_UNDERLINE = 9,
  BLINK = 10,
  RESET_BLINK = 11,
  INVERSE = 12,
  RESET_INVERSE = 13,
  INVISIBLE = 14,
  RESET_INVISIBLE = 15,
  STRIKETHROUGH = 16,
  RESET_STRIKETHROUGH = 17,
  FG_8 = 18,           // 8-color (0-7)
  FG_16 = 19,          // 16-color (0-15)
  FG_256 = 20,         // 256-color palette
  FG_RGB = 21,         // RGB color
  FG_DEFAULT = 22,     // Reset to default
  BG_8 = 23,           // Background 8-color
  BG_16 = 24,          // Background 16-color
  BG_256 = 25,         // Background 256-color
  BG_RGB = 26,         // Background RGB
  BG_DEFAULT = 27,     // Reset background
  UNDERLINE_COLOR_8 = 28,
  UNDERLINE_COLOR_16 = 29,
  UNDERLINE_COLOR_256 = 30,
  UNDERLINE_COLOR_RGB = 31,
  UNDERLINE_COLOR_DEFAULT = 32,
}

export interface RGBColor {
  r: number;
  g: number;
  b: number;
}

export type SgrAttribute =
  | { tag: SgrAttributeTag.BOLD }
  | { tag: SgrAttributeTag.RESET_BOLD }
  | { tag: SgrAttributeTag.ITALIC }
  | { tag: SgrAttributeTag.RESET_ITALIC }
  | { tag: SgrAttributeTag.FAINT }
  | { tag: SgrAttributeTag.RESET_FAINT }
  | { tag: SgrAttributeTag.UNDERLINE }
  | { tag: SgrAttributeTag.RESET_UNDERLINE }
  | { tag: SgrAttributeTag.BLINK }
  | { tag: SgrAttributeTag.RESET_BLINK }
  | { tag: SgrAttributeTag.INVERSE }
  | { tag: SgrAttributeTag.RESET_INVERSE }
  | { tag: SgrAttributeTag.INVISIBLE }
  | { tag: SgrAttributeTag.RESET_INVISIBLE }
  | { tag: SgrAttributeTag.STRIKETHROUGH }
  | { tag: SgrAttributeTag.RESET_STRIKETHROUGH }
  | { tag: SgrAttributeTag.FG_8; color: number }
  | { tag: SgrAttributeTag.FG_16; color: number }
  | { tag: SgrAttributeTag.FG_256; color: number }
  | { tag: SgrAttributeTag.FG_RGB; color: RGBColor }
  | { tag: SgrAttributeTag.FG_DEFAULT }
  | { tag: SgrAttributeTag.BG_8; color: number }
  | { tag: SgrAttributeTag.BG_16; color: number }
  | { tag: SgrAttributeTag.BG_256; color: number }
  | { tag: SgrAttributeTag.BG_RGB; color: RGBColor }
  | { tag: SgrAttributeTag.BG_DEFAULT }
  | { tag: SgrAttributeTag.UNDERLINE_COLOR_RGB; color: RGBColor }
  | { tag: SgrAttributeTag.UNDERLINE_COLOR_DEFAULT }
  | { tag: SgrAttributeTag.UNKNOWN; params: number[] };

// ============================================================================
// Key Encoder Types
// ============================================================================

/**
 * Kitty keyboard protocol flags
 * From include/ghostty/vt/key/encoder.h
 */
export enum KittyKeyFlags {
  DISABLED = 0,
  DISAMBIGUATE = 1 << 0,       // Disambiguate escape codes
  REPORT_EVENTS = 1 << 1,      // Report press and release
  REPORT_ALTERNATES = 1 << 2,  // Report alternate key codes
  REPORT_ALL = 1 << 3,         // Report all events
  REPORT_ASSOCIATED = 1 << 4,  // Report associated text
  ALL = 0x1F,                  // All flags enabled
}

/**
 * Key encoder options
 */
export enum KeyEncoderOption {
  CURSOR_KEY_APPLICATION = 0,           // DEC mode 1
  KEYPAD_KEY_APPLICATION = 1,           // DEC mode 66
  IGNORE_KEYPAD_WITH_NUMLOCK = 2,       // DEC mode 1035
  ALT_ESC_PREFIX = 3,                   // DEC mode 1036
  MODIFY_OTHER_KEYS_STATE_2 = 4,        // xterm modifyOtherKeys
  KITTY_KEYBOARD_FLAGS = 5,             // Kitty protocol flags
}

/**
 * Key action
 */
export enum KeyAction {
  RELEASE = 0,
  PRESS = 1,
  REPEAT = 2,
}

/**
 * Physical key codes (subset, based on USB HID)
 */
export enum Key {
  A = 4,
  B = 5,
  C = 6,
  // ... Add more as needed
  ENTER = 40,
  ESCAPE = 41,
  BACKSPACE = 42,
  TAB = 43,
  SPACE = 44,
  // Arrow keys
  RIGHT = 79,
  LEFT = 80,
  DOWN = 81,
  UP = 82,
  // Function keys
  F1 = 58,
  F2 = 59,
  F3 = 60,
  F4 = 61,
  F5 = 62,
  F6 = 63,
  F7 = 64,
  F8 = 65,
  F9 = 66,
  F10 = 67,
  F11 = 68,
  F12 = 69,
}

/**
 * Modifier keys
 */
export enum Mods {
  NONE = 0,
  SHIFT = 1 << 0,
  CTRL = 1 << 1,
  ALT = 1 << 2,
  SUPER = 1 << 3,   // Windows/Command key
  CAPSLOCK = 1 << 4,
  NUMLOCK = 1 << 5,
}

/**
 * Key event structure
 */
export interface KeyEvent {
  action: KeyAction;
  key: Key;
  mods: Mods;
  consumedMods?: Mods;
  composing?: boolean;
  utf8?: string;
  unshiftedCodepoint?: number;
}

// ============================================================================
// WASM Exports Interface
// ============================================================================

/**
 * Interface for libghostty-vt WASM exports
 */
export interface GhosttyWasmExports extends WebAssembly.Exports {
  memory: WebAssembly.Memory;

  // Memory helpers
  ghostty_wasm_alloc_opaque(): number;
  ghostty_wasm_free_opaque(ptr: number): void;
  ghostty_wasm_alloc_u8_array(len: number): number;
  ghostty_wasm_free_u8_array(ptr: number, len: number): void;
  ghostty_wasm_alloc_u16_array(len: number): number;
  ghostty_wasm_free_u16_array(ptr: number, len: number): void;
  ghostty_wasm_alloc_u8(): number;
  ghostty_wasm_free_u8(ptr: number): void;
  ghostty_wasm_alloc_usize(): number;
  ghostty_wasm_free_usize(ptr: number): void;

  // SGR parser
  ghostty_sgr_new(allocator: number, parserPtrPtr: number): number;
  ghostty_sgr_free(parser: number): void;
  ghostty_sgr_reset(parser: number): void;
  ghostty_sgr_set_params(
    parser: number,
    paramsPtr: number,
    subsPtr: number,
    paramsLen: number
  ): number;
  ghostty_sgr_next(parser: number, attrPtr: number): boolean;
  ghostty_sgr_attribute_tag(attrPtr: number): number;
  ghostty_sgr_attribute_value(attrPtr: number, tagPtr: number): number;
  ghostty_wasm_alloc_sgr_attribute(): number;
  ghostty_wasm_free_sgr_attribute(ptr: number): void;

  // Key encoder
  ghostty_key_encoder_new(allocator: number, encoderPtrPtr: number): number;
  ghostty_key_encoder_free(encoder: number): void;
  ghostty_key_encoder_setopt(
    encoder: number,
    option: number,
    valuePtr: number
  ): number;
  ghostty_key_encoder_encode(
    encoder: number,
    eventPtr: number,
    bufPtr: number,
    bufLen: number,
    writtenPtr: number
  ): number;

  // Key event
  ghostty_key_event_new(allocator: number, eventPtrPtr: number): number;
  ghostty_key_event_free(event: number): void;
  ghostty_key_event_set_action(event: number, action: number): void;
  ghostty_key_event_set_key(event: number, key: number): void;
  ghostty_key_event_set_mods(event: number, mods: number): void;
  ghostty_key_event_set_utf8(event: number, ptr: number, len: number): void;
}
