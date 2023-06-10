import { PropsWithChildren } from "react";
import "../styles/index.css";
import { Inter } from "next/font/google";
import QueryProvider from "@/components/layouts/query-provider";
import Toaster from "@/components/layouts/toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Клавиша",
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <QueryProvider>{children}</QueryProvider>
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
