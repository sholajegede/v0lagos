import type { Metadata } from "next";
import LanyardPage from "@/components/lanyard-page";

// Event details - you can edit these
const EVENT_CITY = "Lagos";
const EVENT_DATE = "February 2026";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://v0lagos.vercel.app";

// Decryption helper for metadata generation
function decryptLanyardData(encrypted: string): { username: string; variant: "dark" | "light" } | null {
  const OBFUSCATION_KEY = "v0gdl";
  
  if (!encrypted) return null;
  try {
    let base64 = encrypted.replace(/-/g, "+").replace(/_/g, "/");
    const padding = (4 - (base64.length % 4)) % 4;
    base64 += "=".repeat(padding);
    
    const binary = Buffer.from(base64, "base64").toString("binary");
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    const decoded = new TextDecoder().decode(bytes);
    
    if (decoded.startsWith(`${OBFUSCATION_KEY}:`)) {
      const withoutKey = decoded.slice(OBFUSCATION_KEY.length + 1);
      const colonIndex = withoutKey.indexOf(":");
      if (colonIndex === -1) return null;
      
      const variant = withoutKey.slice(0, colonIndex) as "dark" | "light";
      const username = withoutKey.slice(colonIndex + 1);
      
      if (variant !== "dark" && variant !== "light") return null;
      
      return { username, variant };
    }
    return null;
  } catch {
    return null;
  }
}

interface PageProps {
  searchParams: Promise<{ u?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const encrypted = resolvedSearchParams.u;
  const data = encrypted ? decryptLanyardData(encrypted) : null;
  
  const userName = data?.username || "Attendee";
  const hasUser = !!data?.username;
  
  const title = hasUser 
    ? `${userName} | v0 IRL ${EVENT_CITY}`
    : `Generate Your Lanyard | v0 IRL ${EVENT_CITY}`;
  
  const description = hasUser
    ? `${userName} is attending v0 IRL ${EVENT_CITY} - ${EVENT_DATE}. Join us for Prompt to Production!`
    : `Create and customize your personalized v0 IRL ${EVENT_CITY} event lanyard. Choose your color variant and download it as a high-resolution PNG.`;

  const pageUrl = encrypted 
    ? `${SITE_URL}/live?u=${encrypted}`
    : `${SITE_URL}/lanyard`;

  // OG Image URLs - different formats for different platforms
  const ogImageUrl = encrypted
    ? `${SITE_URL}/api/og?u=${encrypted}&format=og`
    : `${SITE_URL}/api/og?format=og`;
  
  const twitterImageUrl = encrypted
    ? `${SITE_URL}/api/og?u=${encrypted}&format=twitter`
    : `${SITE_URL}/api/og?format=twitter`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: `v0 IRL ${EVENT_CITY}`,
      type: "website",
      locale: "en_US",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${userName} - v0 IRL ${EVENT_CITY}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@v0",
      images: [twitterImageUrl],
    },
  };
}

export default function Page() {
  return <LanyardPage />;
}
