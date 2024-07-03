import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { StateProvider } from './(components)/StateProvider';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StateProvider>
    <html lang="en">
      <body className={inter.className}>
      <div className="fixed top-0 w-full h-[50px] bg-white z-50">
            <img
              src="https://raw.githubusercontent.com/captain0jay/Zost/main/project/images/logo/zost_og_logo.png"
              alt="sf"
              className="absolute top-2 left-2 sm:left-4 w-[50px] h-[50px]"
            />
          </div>
          <div className="flex h-[calc(100vh-50px)] mt-[50px] p-4">
          {children}
          </div>
      </body>
    </html>
    </StateProvider>
  );
}
