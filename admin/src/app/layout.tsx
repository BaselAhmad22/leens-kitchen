import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Leen's Admin",
    template: "%s | Leen's Admin",
  },
  description: "Content control panel for Leen's Middle East Kitchen site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full antialiased`}>
      <body className="relative min-h-full bg-bg text-fg">
        <div className="studio-backdrop" aria-hidden="true" />
        <div className="relative z-[1] min-h-[100dvh]">{children}</div>
      </body>
    </html>
  );
}
