import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";

const prompt = Prompt({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-prompt",
});

export const metadata: Metadata = {
  title: "CYD Task & Time Tracking",
  description: "ระบบจัดการและติดตามงานพัฒนาโดย CYD&AT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={`${prompt.variable} font-sans bg-[#f4f7f9] text-slate-800 antialiased selection:bg-blue-200`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}