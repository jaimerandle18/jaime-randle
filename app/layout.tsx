import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import { ThemeProvider } from "@/components/ThemeProvider";

const themeScript = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`;

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://jaimerandle.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Jaime Randle — Software Engineer",
  description:
    "Software engineer with 5+ years shipping products across banking, proptech and e-commerce. Building AI agent systems, web and mobile apps with Next.js, React and TypeScript.",
  keywords: [
    "Jaime Randle",
    "Software Engineer",
    "Fullstack Developer",
    "Next.js",
    "React",
    "TypeScript",
    "AI agents",
    "Buenos Aires",
  ],
  authors: [{ name: "Jaime Randle" }],
  openGraph: {
    title: "Jaime Randle — Software Engineer",
    description:
      "5+ years shipping products across banking, proptech and e-commerce. Building AI agent systems and full-stack apps.",
    url: siteUrl,
    siteName: "Jaime Randle",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jaime Randle — Software Engineer",
    description:
      "5+ years shipping products across banking, proptech and e-commerce.",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full">
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
