import { PropsWithChildren } from "react";
import "../styles/index.css";
import { Inter } from "next/font/google";
import QueryProvider from "@/components/layouts/query-provider";
import Toaster from "@/components/layouts/toast";
import Navbar from "@/components/layouts/navbar";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Клавиша",
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="ru">
      <body className={clsx(inter.className, "grid gap-5 grid-cols-5")}>
        <QueryProvider>
          <Navbar />
          <main className="col-span-4 py-5">{children}</main>
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
