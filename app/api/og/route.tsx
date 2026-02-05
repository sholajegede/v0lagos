import { ImageResponse } from "next/og";

// Decryption helper
function decryptLanyardData(
  encrypted: string
): { username: string; variant: "dark" | "light" } | null {
  const OBFUSCATION_KEY = "v0gdl";

  if (!encrypted) return null;
  try {
    let base64 = encrypted.replace(/-/g, "+").replace(/_/g, "/");
    const padding = (4 - (base64.length % 4)) % 4;
    base64 += "=".repeat(padding);

    const binary = atob(base64);
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

async function loadGoogleFont (font: string, text: string) {
    const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`
    const css = await (await fetch(url)).text()
    const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)

    if (resource) {
        const response = await fetch(resource[1])

        if (response.status == 200) {
            return await response.arrayBuffer()
        }
    }

    throw new Error('failed to load font data')
}

export async function GET(request: Request) {
  try {

      // Event details - you can edit these
      const EVENT_CITY = "lagos";
      const EVENT_DATE = "february 7th, 2026";
      const TITLE = 'Prompt to Production'

    const { searchParams } = new URL(request.url);
    const encrypted = searchParams.get("u");
    const format = searchParams.get("format") || "og"; // og, twitter, linkedin, square

    const data = encrypted ? decryptLanyardData(encrypted) : null;
    const userName = data?.username || "Attendee";
    const variant = data?.variant || "dark";

    // Format dimensions
    const dimensions = {
      og: { width: 1200, height: 630 }, // Facebook, LinkedIn, Discord
      twitter: { width: 1200, height: 600 }, // Twitter summary_large_image
      linkedin: { width: 1200, height: 627 }, // LinkedIn optimal
      square: { width: 1200, height: 1200 }, // Instagram, WhatsApp
    };

    const { width, height } = dimensions[format as keyof typeof dimensions] || dimensions.og;

    // Colors based on variant
    const isDark = variant === "dark";
    const bgColor = isDark ? "#000000" : "#ffffff";
    const textColor = isDark ? "#ffffff" : "#000000";
    const accentColor = "#878787";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            backgroundColor: bgColor,
              fontFamily: 'Geist',
              fontSize: 48,
            padding: "60px",
          }}
        >
          <div style={{
              display: 'flex',
              gap: '36px',
              alignItems: 'center'
          }}>
            <svg height="170" xmlns="http://www.w3.org/2000/svg" stroke-linejoin="round" viewBox="0 0 16 16">
                <path clip-rule="evenodd" d="M9.50321 5.5H13.2532C13.3123 5.5 13.3704 5.5041 13.4273 5.51203L9.51242 9.42692C9.50424 9.36912 9.5 9.31006 9.5 9.25L9.5 5.5L8 5.5L8 9.25C8 10.7688 9.23122 12 10.75 12H14.5V10.5L10.75 10.5C10.6899 10.5 10.6309 10.4958 10.5731 10.4876L14.4904 6.57028C14.4988 6.62897 14.5032 6.68897 14.5032 6.75V10.5H16.0032V6.75C16.0032 5.23122 14.772 4 13.2532 4H9.50321V5.5ZM0 5V5.00405L5.12525 11.5307C5.74119 12.3151 7.00106 11.8795 7.00106 10.8822V5H5.50106V9.58056L1.90404 5H0Z" fill="white" fill-rule="evenodd"/>
            </svg>
              <div style={{
                  display: 'flex',
                  flexDirection: 'column',
              }}>
                <span style={{
                    color: textColor,
                    textTransform: 'uppercase',
                    lineHeight: '56px',
                }}>{EVENT_CITY}</span>
                <span style={{
                    color: accentColor,
                    textTransform: 'uppercase',
                    lineHeight: '56px'
                }}>{EVENT_DATE}</span>
              </div>
          </div>
            <div style={{
                display: 'flex',
                gap: '36px',
                marginBottom: '32px'
            }}>
                <span style={{
                    color: textColor,
                    fontSize: '130px',
                    lineHeight: '122px',
                }}>
                    {TITLE}
                </span>
            </div>
            <div style={{
                display: 'flex',
                gap: '36px',
            }}>
                <span style={{
                    color: accentColor,
                    lineHeight: '56px',
                    textTransform: 'uppercase'
                }}>
                    {userName}
                </span>
            </div>
        </div>
      ),
      {
        width,
        height,
          fonts: [
              {
                  name: 'Geist',
                  data: await loadGoogleFont('Geist', TITLE),
                  style: 'normal',
              },{
                  name: 'Geist',
                  data: await loadGoogleFont('Geist', userName),
                  style: 'normal',
              },
          ],
      }
    );
  } catch (e) {
    console.log(`OG Image Generation Error: ${e}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
