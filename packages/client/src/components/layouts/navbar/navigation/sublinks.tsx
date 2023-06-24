"use client";

import { useBoolean } from "@/hooks/boolean.hook";
import { LinkWithSublinks } from ".";
import LinkItem from "./link";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

type Props = {
  link: LinkWithSublinks;
};

const Sublinks = ({ link }: Props) => {
  const pathname = usePathname();
  const [isOpen, { toggle: toggleIsOpen }] = useBoolean(
    link.sublinks?.some((sublink) =>
      sublink.link === "/" ? pathname === "/" : pathname === sublink.link
    )
  );
  return (
    <ul>
      <LinkItem
        link={link}
        key={`${link.link}-button`}
        onClick={toggleIsOpen}
      />
      <AnimatePresence>
        {isOpen && (
          <motion.ul className="pl-3">
            <LinkItem
              key={`${link.link}-fitst-link`}
              link={link}
              isSublink
              single
            />
            {link.sublinks?.map((sublink, index) => (
              <LinkItem
                key={`${sublink.link}${index}-sublink`}
                link={sublink}
                isSublink
                single
              />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </ul>
  );
};

export default Sublinks;
