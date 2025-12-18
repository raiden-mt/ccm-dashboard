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
      <body>
        <NuqsAdapter>
          <div className="flex max-h-dvh w-full flex-col">
            <DashboardHeader />
            <main className="flex flex-1 overflow-y-auto">{children}</main>
          </div>
        </NuqsAdapter>
      </body>
    </html>
  );
}
