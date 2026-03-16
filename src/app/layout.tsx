import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gyaansagar Management Dashboard",
  description: "Gyaansagar School Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <script src="https://fluxypy-chat-api.onrender.com/widget/chatbot.js" data-api-key="fpy_pub_pk4sw0tl5vn2dxwacl9dex03" async defer></script>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
