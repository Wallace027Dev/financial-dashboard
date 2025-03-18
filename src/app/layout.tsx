import type { Metadata } from "next";
import "@/styles/globals.css";
import { Poppins, Roboto_Mono } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins"
});

const robotoMono = Roboto_Mono({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-robotoMono"
});

export const metadata: Metadata = {
  title: "Dashboard Financeiro",
  description: "Projeto fullstack"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${poppins.variable} ${robotoMono.variable} grid-custom antialiased bg-background text-foreground h-screen place-self-center py-8 font-poppins`}
      >
        {children}
      </body>
    </html>
  );
}
