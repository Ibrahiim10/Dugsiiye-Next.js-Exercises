import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Todo App - Next.js 15.4",
  description: "Advanced Todo App with MongoDB, Search, Filters, and Bulk Operations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
