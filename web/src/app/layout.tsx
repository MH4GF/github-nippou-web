import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "github-nippou",
  description: "Print today's your GitHub action",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className="h-full bg-gray-100">
      <body className="h-full">{children}</body>
    </html>
  );
}
