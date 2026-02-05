import {type ClassValue, clsx} from 'clsx'
import {twMerge} from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

// Simple obfuscation for usernames in URLs (base64 with UTF-8 support for emojis)
const OBFUSCATION_KEY = "v0gdl";

// Helper to convert UTF-8 string to base64 (supports Unicode/emojis)
function utf8ToBase64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");
  return btoa(binary);
}

// Helper to convert base64 back to UTF-8 string (supports Unicode/emojis)
function base64ToUtf8(base64: string): string {
  const binary = atob(base64);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export type CardVariant = "dark" | "light";

export interface LanyardData {
  username: string;
  variant: CardVariant;
}

export function encryptLanyardData(username: string, variant: CardVariant): string {
  if (!username) return "";
  // Format: key:variant:username
  const combined = `${OBFUSCATION_KEY}:${variant}:${username}`;
  const encoded = utf8ToBase64(combined);
  return encoded.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decryptLanyardData(encrypted: string): LanyardData | null {
  if (!encrypted) return null;
  try {
    // Restore base64 padding and characters
    let base64 = encrypted.replace(/-/g, "+").replace(/_/g, "/");
    const padding = (4 - (base64.length % 4)) % 4;
    base64 += "=".repeat(padding);
    
    const decoded = base64ToUtf8(base64);
    // Verify and extract data - format: key:variant:username
    if (decoded.startsWith(`${OBFUSCATION_KEY}:`)) {
      const withoutKey = decoded.slice(OBFUSCATION_KEY.length + 1);
      const colonIndex = withoutKey.indexOf(":");
      if (colonIndex === -1) return null;
      
      const variant = withoutKey.slice(0, colonIndex) as CardVariant;
      const username = withoutKey.slice(colonIndex + 1);
      
      // Validate variant
      if (variant !== "dark" && variant !== "light") return null;
      
      return { username, variant };
    }
    return null;
  } catch {
    return null;
  }
}

export const transitionVariants = {
    item: {
        hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                type: 'spring',
                bounce: 0.3,
                duration: 1.5,
            },
        },
    },
}
