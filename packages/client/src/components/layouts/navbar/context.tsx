"use client";

import { useBoolean } from "@/hooks/boolean.hook";
import { PropsWithChildren, createContext } from "react";

export const NavbarContext = createContext({
  isOpen: false,
  close: () => {},
  toggle: () => {},
});

const NavbarLayout = ({ children }: PropsWithChildren) => {
  const [isOpen, { toggle, setFalse: close }] = useBoolean();
  return (
    <NavbarContext.Provider
      value={{
        isOpen,
        toggle,
        close,
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
};

export default NavbarLayout;
