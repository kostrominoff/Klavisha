"use client";

import Portal from "../portal";
import Button from "@/components/ui/button";
import { PropsWithChildren, useContext } from "react";
import clsx from "clsx";
import { NavbarContext } from "./context";

const Bar = ({ children }: PropsWithChildren) => {
  const { isOpen, toggle } = useContext(NavbarContext);

  return (
    <>
      <aside
        className={clsx(
          "z-50 min-h-screen rounded-r-3xl shadow md:col-span-1 max-md:fixed overflow-clip bg-slate-100 max-md:w-[260px] transition duration-[400ms]",
          {
            "-translate-x-full opacity-0": !isOpen,
            "max-md:opacity-100": isOpen,
          }
        )}
      >
        {children}
      </aside>
      <Portal>
        <Button
          className="fixed right-1 bottom-1 md:hidden md:-z-50"
          onClick={toggle}
          onlyIcon
        >
          OP
        </Button>
      </Portal>
    </>
  );
};

export default Bar;
