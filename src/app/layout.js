import { Inter, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

export const metadata = {
  title: process.env.NEXT_PUBLIC_TITLE || "Kelvin Juma - Full Stack Engineer",
  description:
    "Engineering modern software solutions. Transforming ideas into scalable, performant apps for real-world impact.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${manrope.variable} antialiased bg-background text-on-surface font-body selection:bg-primary/30 selection:text-primary overflow-x-hidden`}
      >
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        {children}
      </body>
    </html>
  );
}
