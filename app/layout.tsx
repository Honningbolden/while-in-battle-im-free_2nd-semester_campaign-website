import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "While In Battle I'm Free, Never Free To Rest",
  description: "A performance by Hooman Sharifi & Cullberg. Brought to you in collaboration with Metropolis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/lpw3gsy.css"/>
      </head>
      <body>{children}</body>
    </html>
  );
}
