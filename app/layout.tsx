import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import "./template-styles/classic-ivory.css";
import "./template-styles/floral-blush.css";
import "./template-styles/gold-ornate-royale.css";
import "./template-styles/ganesha-premium.css";

export const metadata: Metadata = {
  title: "Free Marriage Biodata Maker",
  description: "Create beautiful marriage biodata online and download PDF for free."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
