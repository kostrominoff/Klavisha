"use client";

import Link from "next/link";
import type { Link as LinkType } from ".";
import { ButtonHTMLAttributes } from "react";
import Typography from "@/components/ui/typography";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import Icons from "@/components/ui/icons";
import { motion } from "framer-motion";

type SingleProps = {
  single: true;
};

type MultipleProps = {
  single?: false;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type Props = {
  link: LinkType;
  isSublink?: boolean;
} & (MultipleProps | SingleProps);

const LinkItem = ({ single, link, isSublink, ...props }: Props) => {
  const pathname = usePathname();

  return (
    <motion.li
      className="mb-1"
      initial={{ height: 0, marginBottom: 0, opacity: 0 }}
      animate={{
        height: "auto",
        marginBottom: "0.25rem",
        opacity: 1,
      }}
      exit={{ height: 0, marginBottom: 0, opacity: 0 }}
    >
      {single ? (
        <Link href={link.link}>
          <Typography
            className={clsx({
              "font-semibold":
                link.link === "/" ? pathname === "/" : pathname === link.link,
            })}
            variant={isSublink ? "text2" : "text1"}
            tag="span"
          >
            {link.label}
          </Typography>
        </Link>
      ) : (
        <>
          <button {...props} className="flex gap-1 items-center">
            <Typography variant="text1" tag="span">
              {link.label}
            </Typography>
            <Icons.arrowDown />
          </button>
        </>
      )}
    </motion.li>
  );
};

export default LinkItem;
