import clsx from "clsx";
import { HTMLAttributes, ReactNode } from "react";

type TypographyTag = "h1" | "h2" | "h3" | "h4" | "h5" | "p" | "span";
type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "text1"
  | "text2"
  | "text3"
  | "text4";

type Props = {
  tag?: TypographyTag;
  variant?: TypographyVariant;
  children?: ReactNode;
  customColor?: boolean;
} & HTMLAttributes<HTMLElement>;

const Typography = ({
  children,
  variant = "text1",
  tag: Tag = "p",
  className,
  customColor,
  ...props
}: Props) => {
  return (
    <Tag
      className={clsx(
        {
          "text-slate-900": !customColor,
          "font-semibold md:text-5xl max-md:text-4xl": variant === "h1",
          "font-semibold md:text-4xl max-md:text-3xl": variant === "h2",
          "font-semibold md:text-3xl max-md:text-2xl": variant === "h3",
          "font-semibold md:text-2xl max-md:text-xl": variant === "h4",
          "font-semibold text-xl": variant === "h5",
          "text-lg": variant === "text1",
          "text-base": variant === "text2",
          "text-sm": variant === "text3",
          "text-xs": variant === "text4",
        },
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default Typography;
