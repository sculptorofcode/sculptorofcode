import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ParticlesBackground from "@/components/ParticlesBackground";
import { ProfileProvider } from "@/context/ProfileContext";
import Head from "next/head";

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
  viewport: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <ProfileProvider>
        <Head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Person",
                "name": "Saikat Roy",
                "jobTitle": "Cybersecurity Enthusiast & Full Stack Developer",
                "url": "https://cyber-saikat.vercel.app/",
                "sameAs": [
                  "https://github.com/CyberSaikat",
                  "https://www.linkedin.com/in/saikat-roy-358204294/",
                ],
                "alumniOf": {
                  "@type": "EducationalOrganization",
                  "name": "Siliguri Government Polytechnic",
                },
                "knowsAbout": ["Cybersecurity", "Web Development", "Full-stack Development"],
              }),
            }}
          />
        </Head>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <div className="min-h-screen text-gray-100">
              <ParticlesBackground />
              {children}
            </div>
          </body>
        </html>
      </ProfileProvider>
    </>
  );
}
