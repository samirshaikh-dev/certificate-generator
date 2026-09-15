import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Cinzel, Playfair_Display, Great_Vibes, Plus_Jakarta_Sans } from "next/font/google";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontCinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
});

const fontPlayfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const fontSignature = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-signature",
});

export const metadata = {
  title: "Apex Certificates | Verification & Generation Platform",
  description: "Enterprise certificate generation and public verification system powered by Next.js, MongoDB, and Cloudinary.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${fontSans.variable} ${fontCinzel.variable} ${fontPlayfair.variable} ${fontSignature.variable}`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans">
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
