import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata = {
  title: "Coderaft Demos — Katalog Portfolio",
  description: "Koleksi demo website profesional: landing page dan dashboard interaktif.",
};


export default function RootLayout({ children }) {
  return (
    <html lang="id" className={geist.className}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
