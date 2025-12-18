import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { DashboardHeader } from "~/components/header";

export const metadata: Metadata = {
  title: "CCM Database Dashboard",
  description: "Changu Changu Moto - Reporting System",
  icons: {
    icon: "/logo.png",
  },
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body className="h-dvh overflow-hidden [--header-height:5rem]">
        <NuqsAdapter>
          <div className="grid h-dvh w-full grid-rows-[auto,1fr] overflow-hidden">
            <DashboardHeader />
            <main className="min-h-0 overflow-hidden">{children}</main>
          </div>
        </NuqsAdapter>
      </body>
    </html>
  );
}
