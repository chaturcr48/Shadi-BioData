import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Free Marriage Biodata Maker",
  description: "Create beautiful marriage biodata online and download PDF for free."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
