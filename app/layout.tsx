// File: app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from './ui/Sidebar';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reunion Dashboard",
  description: "Manage your reunion guests",
};

// This is the single, correct RootLayout function
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-800`}>
        <Toaster position="top-center" />
        <div className="flex">
          <Sidebar />
          <main className="flex-grow p-6 bg-gray-900 min-h-screen">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
