"use client";

import { useBoolean } from "@/hooks/boolean.hook";
import { LinkWithSublinks } from ".";
import LinkItem from "./link";

type Props = {
  link: LinkWithSublinks;
};

const Sublinks = ({ link }: Props) => {
  const [isOpen, { toggle: toggleIsOpen }] = useBoolean();
  return (
    <ul>
      <LinkItem link={link} onClick={toggleIsOpen} />
      {isOpen && (
        <ul>
          <LinkItem link={link} single />
          {link.sublinks?.map((sublink) => (
            <LinkItem key={sublink.link} link={sublink} single />
          ))}
        </ul>
      )}
    </ul>
  );
};

export default Sublinks;
