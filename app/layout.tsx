import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/NavBar";
import ClientOnly from "./components/ClientOnly";

import RegisterModal from "./components/Modals/RegisterModal";
import LoginModal from "./components/Modals/LoginModal";
import ToastProvider from "./providers/ToastProvider";
import getCurrentUser from "./actions/getCurrentUser";

export const metadata: Metadata = {
  title: "Mags BNB",
  description: "Generated by create next app",
};

const fonts = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  console.log(currentUser, "current user in layout");
  return (
    <html lang="en">
      <body className={fonts.className}>
        <ClientOnly>
          <ToastProvider />
          <RegisterModal />
          <LoginModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
