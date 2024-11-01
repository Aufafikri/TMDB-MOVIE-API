import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../styles/globals.css";
import TanstackProviders from "../../providers/TanstackProviders";
import { ThemeProvider } from 'next-themes'
import { Source_Sans_3 } from "next/font/google"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'evst movies list',
  description: "Discover the best movies on EVST Movies.",
  authors: [
    {
      name: "aufa fikri",
      url: 'https://evstmovies.vercel.app'
    }
  ],
  icons: './icons.png'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TanstackProviders>
          {children}
        </TanstackProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
