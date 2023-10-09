import "./globals.css";
import type { Metadata } from "next";
import { WasmScript } from "./WasmScript";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <WasmScript />
      <body>{children}</body>
    </html>
  );
}
