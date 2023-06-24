"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { ButtonHTMLAttributes } from "react";
import Icons from "../icons/index";
import { style } from "./styles";

export type ButtonVariants = "primary" | "secondary" | "tertiary";

type Props = {
  variant?: ButtonVariants;
  loading?: boolean;
  disabled?: boolean;
  onlyIcon?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonLoaderProps = {
  primary?: boolean;
  onlyIcon?: boolean;
};

const ButtonLoader = ({ primary = true, onlyIcon }: ButtonLoaderProps) => {
  return (
    <motion.span
      initial={{
        width: onlyIcon ? "auto" : 0,
        opacity: 0,
        marginLeft: 0,
      }}
      animate={{
        width: "auto",
        opacity: 1,
        marginLeft: onlyIcon ? 0 : "0.5rem",
      }}
      exit={{
        width: onlyIcon ? "auto" : 0,
        opacity: 0,
        marginLeft: 0,
      }}
    >
      <Icons.ButtonLoading onlyIcon={onlyIcon} primary={primary} />
    </motion.span>
  );
};

const Button = ({
  variant = "primary",
  loading,
  onlyIcon,
  disabled,
  className,
  children,
  ...props
}: Props) => {
  return (
    <button
      className={clsx(
        style.main,
        "flex flex-row justify-center items-center text-ellipsis overflow-hidden whitespace-nowrap",
        {
          [style.primary]: variant === "primary" && !loading && !disabled,
          [style.secondary]: variant === "secondary" && !loading && !disabled,
          [style.tertiary]: variant === "tertiary" && !loading && !disabled,

          "cursor-wait": loading,
          "text-white bg-indigo-400 hover:bg-indigo-400":
            loading && variant === "primary",
          "bg-slate-100 text-slate-600 hover:bg-slate-100":
            loading && variant === "secondary",
          "text-slate-500 bg-transparent hover:bg-transparent":
            loading && variant === "tertiary",

          "bg-slate-100 cursor-not-allowed hover:bg-slate-100 text-slate-400":
            disabled,
          "opacity-75 bg-transparent hover:bg-transparent":
            disabled && variant === "tertiary",

          "px-4 py-[10px]": !onlyIcon,
          "py-3 px-3": onlyIcon,
        },
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      <span className="overflow-hidden text-ellipsis">
        {!onlyIcon && children}
      </span>
      <AnimatePresence>
        {onlyIcon && !loading && (
          <span
            className={clsx({
              "opacity-75": disabled && variant !== "primary",
            })}
          >
            {children}
          </span>
        )}
        {loading && (
          <ButtonLoader onlyIcon={onlyIcon} primary={variant === "primary"} />
        )}
      </AnimatePresence>
    </button>
  );
};

export default Button;
