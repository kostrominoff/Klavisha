"use client";

import Button from "@/components/ui/button";
import Portal from "../portal";
import Bar from "./bar";

// TODO: Open and close mobile bar
const Navbar = () => {
  return (
    <>
      <Bar />
      <Portal>
        <Button
          className="fixed right-2 bottom-2 z-50 md:hidden md:-z-50"
          onlyIcon
        >
          OP
        </Button>
      </Portal>
    </>
  );
};

export default Navbar;
