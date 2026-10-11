import type { Metadata, Viewport } from "next";
import { Sora, DM_Sans } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";

const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: true });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });
const FloatButtons = dynamic(() => import("@/components/FloatButtons"), { ssr: false });
const AIChatbot = dynamic(() => import("@/components/AIChatbot"), { ssr: false });

const display = Sora({ subsets: ["latin"], variable: "--font-display", weight: ["400", "600", "700", "800"] });
const body = DM_Sans({ subsets: ["latin"], variable: "--font-body" });

const title = "VCAN 3D | 3D Printing, Vacuum Casting & Rapid Prototyping in Chennai";
const description = "VCAN 3D offers professional 3D printing (FDM, SLA, SLS, MJF, DLP), vacuum casting, rapid prototyping & injection molding services in Chennai with 15+ years of expertise. Get a free quote today!";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vcan3d.com"),
  title, description,
  keywords: ["3D printing Chennai", "vacuum casting Chennai", "rapid prototyping Chennai", "FDM printing", "SLA printing", "SLS printing", "MJF printing", "DLP printing", "injection molding Chennai", "mould making Chennai", "low volume production Chennai", "VCAN 3D"],
  icons: { icon: "/assets/favicon.ico" },
  openGraph: { title, description, url: "https://www.vcan3d.com/", siteName: "VCAN 3D", locale: "en_IN", type: "website", images: [{ url: "/assets/home.jpeg", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title, description },
  other: {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "strict-origin-when-cross-origin",
  },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0B0F19" };

const jsonLd = {
  "@context": "https://schema.org", "@type": "LocalBusiness", name: "VCAN 3D", url: "https://www.vcan3d.com",
  telephone: "+919342553090", email: "sales@vcan3d.com",
  address: { "@type": "PostalAddress", streetAddress: "No.458/9, Krishna Nagar, Manimagalam Main Road, Nandambakkam, Kundrathur", addressLocality: "Chennai", postalCode: "600069", addressCountry: "IN" },
  geo: { "@type": "GeoCoordinates", latitude: 12.984, longitude: 80.0732 },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatButtons />
        <AIChatbot />
      </body>
    </html>
  );
}
