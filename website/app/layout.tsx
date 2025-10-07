import type { Metadata } from "next";
import { IBM_Plex_Mono, Kalam } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { siteConfig } from "@/config/site";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const kalam = Kalam({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

/**
 * Root Layout with Clerk Integration (Next.js App Router)
 *
 * ✅ Uses <ClerkProvider> from @clerk/nextjs (App Router)
 * ✅ Wraps the entire application
 *
 * This is the CURRENT, CORRECT approach for Clerk.
 * Do NOT use the old Pages Router approach (_app.tsx).
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={ibmPlexMono.className}
          style={
            { "--font-kalam": kalam.style.fontFamily } as React.CSSProperties
          }
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
