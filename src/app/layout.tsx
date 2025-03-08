import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ProfileProvider } from "@/context/ProfileContext";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import CustomCursor from "@/components/CustomCursor";
import PageTransition from "@/components/PageTransition";
import { PageTransitionProvider } from "@/context/PageTransitionContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Saikat Roy - Cybersecurity Enthusiast & Web Developer",
  description:
    "Saikat Roy is a Computer Science student passionate about web development and cybersecurity. Explore his projects, skills, and connect with him.",
  keywords:
    "Saikat Roy, Cybersecurity, Web Development, Full-stack Developer, React, Next.js, MongoDB, JavaScript",
  icons: {
    icon: 'images/favicon.ico',
  },
  openGraph: {
    title: "Saikat Roy - Cybersecurity Enthusiast & Web Developer",
    description:
      "Explore Saikat Roy's portfolio showcasing projects, skills, and expertise in web development and cybersecurity.",
    url: new URL("https://cyber-saikat.vercel.app/").toString(),
    siteName: "Saikat Roy Portfolio",
    images: [
      {
        url: "https://cyber-saikat.vercel.app/images/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Saikat Roy",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saikat Roy - Cybersecurity Enthusiast & Web Developer",
    description:
      "Discover Saikat Roy's projects and expertise in web development and cybersecurity.",
    images: [
      {
        url: "https://cyber-saikat.vercel.app/images/profile.jpg",
        alt: "Saikat Roy",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
        <PageTransitionProvider>
          <ProfileProvider>
            <PageTransition>
              <div className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen text-gray-100`}>
                {children}
                <CustomCursor />
                <Analytics />
                <SpeedInsights />
              </div>
            </PageTransition>
          </ProfileProvider>
        </PageTransitionProvider>
      </body>
    </html>
  );
}
