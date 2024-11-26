import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./client.css";
import { AuthProvider } from "@/components/provider/AuthProvider";
import Client from "@/components/shared/Client";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Farm Guard",
  description: "Farming Made Easy",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "next14", "pwa", "next-pwa"],
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "icon512_rounded.png" },
    { rel: "icon", url: "icon512_rounded.png" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased fx items-center justify-center`}
        suppressHydrationWarning
      >
        <AuthProvider>
          <Client>
            <div className="max-w-[500px] w-full ">{children}</div>
          </Client>
        </AuthProvider>
      </body>
    </html>
  );
}
