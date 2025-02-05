import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import {
  ClerkProvider
} from '@clerk/nextjs'
import ModalProvider from "@/providers/modal-provider";
import { Toaster } from "@/components/ui/toaster"
import { BillingProvider } from "@/providers/billing-provider";
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
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html>
        <body
          className={`${font.className} antialiased`}
        >
          <ThemeProvider attribute={'class'} defaultTheme="dark" enableSystem>
            <BillingProvider>
              <ModalProvider>
                {children}
                <Toaster />
              </ModalProvider>
            </BillingProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
