import type { Metadata } from "next";
import { Lora, Manrope } from "next/font/google";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { PageTransition } from "@/components/page-transition";
import { getSiteData } from "@/lib/content";
import { ContentProvider } from "@/lib/content-context";
import "./globals.css";

export const dynamic = "force-dynamic";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const { restaurant } = await getSiteData();
  return {
    title: {
      default: `${restaurant.fullName} | TTDI, Kuala Lumpur`,
      template: `%s | ${restaurant.name}`,
    },
    description: `${restaurant.award} Syrian kitchen in TTDI. Modern plates from chef ${restaurant.chef}.`,
    openGraph: {
      title: restaurant.fullName,
      description: restaurant.tagline,
      type: "website",
      locale: "en_MY",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getSiteData();

  return (
    <html lang="en" className={`${manrope.variable} ${lora.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-bg text-fg">
        <ContentProvider data={data}>
          <Nav />
          <main className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </ContentProvider>
      </body>
    </html>
  );
}
