import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nanka Hair Studio | Salon fryzjerski w Bilczycach",
  description: "Nanka Hair Studio. Profesjonalne usługi fryzjerskie w Bilczycach.",
  icons: { icon: "/favicon.svg" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
