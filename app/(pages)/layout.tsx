import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "../components/navigation/navigation";
import Footer from "../components/navigation/footer/footer";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: '%s | Ward Wise',
    default: 'Ward Wise',
  },
  description: "Aldermanic menu spending on neighborhood infrastructure.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html lang="en">
        <body className={`${inter.className} w-full h-full flex flex-col`}>
          {children}
        </body>
      </html>
    </>
  );
}
