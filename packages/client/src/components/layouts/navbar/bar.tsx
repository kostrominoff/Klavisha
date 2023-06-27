"use client";

import { useBoolean } from "@/hooks/boolean.hook";
import Portal from "../portal";
import Button from "@/components/ui/button";
import { PropsWithChildren, useEffect } from "react";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const Bar = ({ children }: PropsWithChildren) => {
  const [isOpen, { toggle: toggleIsOpen, setFalse: close }] = useBoolean();

  const pathname = usePathname();

  useEffect(() => {
    close();
  }, [close, pathname]);

  return (
    <>
      <aside
        className={clsx(
          "z-50 min-h-screen rounded-r-3xl shadow md:col-span-1 max-md:fixed overflow-clip bg-slate-100 max-md:w-[260px] transition duration-[400ms]",
          {
            "max-md:-translate-x-full max-md:opacity-0": !isOpen,
            "max-md:opacity-100": isOpen,
          }
        )}
      >
        {children}
      </aside>
      <Portal>
        <Button
          className="fixed right-1 bottom-1 md:hidden md:-z-50"
          onClick={toggleIsOpen}
          onlyIcon
        >
          OP
        </Button>
      </Portal>
    </>
  );
};

export default Bar;
