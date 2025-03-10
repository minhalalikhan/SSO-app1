import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "App1",
  description: "sso demo app ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>

      <html lang="en">
        <body
          className={ `${geistSans.variable} ${geistMono.variable} antialiased
          
          ` }
        >
          <div className=" bg-emerald-800 text-white  font-bold text-2xl flex justify-center items-center h-[50px]">
            <h3>App1</h3>
          </div>

          { children }
        </body>
      </html>
    </Providers>
  );
}
