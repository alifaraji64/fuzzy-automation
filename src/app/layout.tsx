import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";

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
      <ThemeProvider attribute={'class'} defaultTheme="dark" enableSystem>
        <body
          className={`${font.className} antialiased`}
        >
          {children}
        </body>

      </ThemeProvider>
    </html>
  );
}
