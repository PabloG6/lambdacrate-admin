import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TRPCProvider } from "@/contexts/TrpcProvider";
const inter = Inter({ subsets: ["latin"] });
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(`h-full dark ${mono.variable}`, inter.className)}>
      <body className="h-screen">
        <TRPCProvider>
        {children}

        </TRPCProvider>

 
       
      </body>
    </html>
  );

}

