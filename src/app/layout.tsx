import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import {
  ClerkProvider
} from '@clerk/nextjs'
const font = DM_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fuzzy",
  description: "Automate your work with fuzzy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
        <ThemeProvider attribute={'class'} defaultTheme="dark" enableSystem>
          <body
            className={`${font.className} antialiased`}
          >
            {children}
          </body>

        </ThemeProvider>
      </ClerkProvider>
    </html>
  );
}
