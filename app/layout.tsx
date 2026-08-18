import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
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
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-F9FKFYX9QM" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-F9FKFYX9QM');
          `}
        </Script>
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
