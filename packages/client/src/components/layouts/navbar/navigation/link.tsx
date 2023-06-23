import Link from "next/link";
import type { Link as LinkType } from ".";
import { ButtonHTMLAttributes } from "react";

type SingleProps = {
  single: true;
};

type MultipleProps = {
  single?: false;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type Props = {
  link: LinkType;
} & (MultipleProps | SingleProps);

const LinkItem = ({ single, link, ...props }: Props) => {
  return (
    <li>
      {single ? (
        <Link href={link.link}>{link.label}</Link>
      ) : (
        <>
          <button {...props}>{link.label}</button>
        </>
      )}
    </li>
  );
};

export default LinkItem;
