import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

// Importando a fonte Poppins
const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Dashboard Financeiro",
  description: "Projeto fullstack",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) { 
  return (
    <html lang="pt-br">
      <body
        className={`${poppins.variable} antialiased`}
        >
        {children}
      </body>
    </html>
  );
}
