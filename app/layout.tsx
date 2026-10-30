import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import { Amiri, Cinzel, Cormorant_Garamond, Lora, Manrope, Noto_Sans_Gurmukhi, Noto_Serif_Devanagari, Playfair_Display } from "next/font/google";
import "./globals.css";
import "./document.css";

const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-manrope", display: "swap" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600", "700"], style: ["normal", "italic"], variable: "--font-cormorant", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600", "700"], style: ["normal", "italic"], variable: "--font-playfair", display: "swap" });
const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-cinzel", display: "swap" });
const lora = Lora({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-lora", display: "swap" });
const devanagari = Noto_Serif_Devanagari({ subsets: ["devanagari"], weight: ["500", "600"], variable: "--font-devanagari", display: "swap" });
const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"], variable: "--font-arabic", display: "swap" });
const gurmukhi = Noto_Sans_Gurmukhi({ subsets: ["gurmukhi"], weight: ["500", "600"], variable: "--font-gurmukhi", display: "swap" });

const fontVariables = [manrope, cormorant, playfair, cinzel, lora, devanagari, amiri, gurmukhi].map((font) => font.variable).join(" ");

export const metadata: Metadata = {
  title: {
    default: "Shadi BioData · Free Marriage Biodata Maker",
    template: "%s · Shadi BioData"
  },
  description:
    "Create a beautiful marriage biodata in minutes. 25+ elegant templates for Hindu, Muslim, Sikh, Christian and general biodata. Add your photo, preview live, and download a print-ready A4 PDF. Free, private, no sign-up.",
  keywords: ["marriage biodata", "biodata maker", "marriage biodata format", "shadi biodata", "matrimonial biodata", "biodata for marriage pdf", "hindu marriage biodata", "muslim marriage biodata"],
  applicationName: "Shadi BioData",
  openGraph: {
    title: "Shadi BioData · Free Marriage Biodata Maker",
    description: "25+ elegant templates. Add your photo, preview live and download a print-ready PDF. Free and private.",
    type: "website",
    locale: "en_IN",
    siteName: "Shadi BioData"
  },
  twitter: {
    card: "summary_large_image",
    title: "Shadi BioData · Free Marriage Biodata Maker",
    description: "25+ elegant templates. Add your photo, preview live and download a print-ready PDF."
  },
  robots: { index: true, follow: true }
};

export const viewport: Viewport = {
  themeColor: "#7a1f2b",
  width: "device-width",
  initialScale: 1
};

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en" className={fontVariables}>
//       <body className="min-h-screen bg-ivory-100 font-sans text-ink antialiased">
//         {children}
//         <Script src="https://www.googletagmanager.com/gtag/js?id=G-F9FKFYX9QM" strategy="afterInteractive" />
//         <Script id="google-analytics" strategy="afterInteractive">
//           {`window.dataLayer = window.dataLayer || [];
//             function gtag(){dataLayer.push(arguments);}
//             gtag('js', new Date());
//             gtag('config', 'G-F9FKFYX9QM');`}
//         </Script>

//         <script async src="https://www.googletagmanager.com/gtm.js?id=GTM-NL2GVG9Q"></script>
//         <script>
//           {`window.dataLayer = window.dataLayer || [];
//             function gtag(){dataLayer.push(arguments);}
//             gtag('js', new Date());`}
//         </script>

//         <Analytics />
//       </body>
//     </html>
//   );
// }


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables}>
      <head>
        {/* Google Tag Manager */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NL2GVG9Q');`,
          }}
        />
      </head>
      <body className="min-h-screen bg-ivory-100 font-sans text-ink antialiased">
        {/* Google Tag Manager (noscript fallback for users with JS disabled) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NL2GVG9Q"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>

        {children}
        <Analytics />
      </body>
    </html>
  );
}
