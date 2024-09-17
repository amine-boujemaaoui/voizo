import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { VoizoContextProvider } from "@/contexts/VoizoContext";

export const metadata: Metadata = {
  title: "Voizo",
  description: "Voizo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <VoizoContextProvider>
          <body>{children}</body>
        </VoizoContextProvider>
      </html>
    </ClerkProvider>
  );
}
