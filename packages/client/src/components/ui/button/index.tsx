"use client";

import clsx from "clsx";
import { AnimatePresence, MotionProps, motion } from "framer-motion";
import { ButtonHTMLAttributes } from "react";
import Icons from "../icons/index";

type Props = {
  variant?: "primary" | "secondary" | "tertiary";
  loading?: boolean;
  disabled?: boolean;
  onlyIcon?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  MotionProps;

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
      <Icons.buttonLoading onlyIcon={onlyIcon} primary={primary} />
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
    <motion.button
      className={clsx(
        "flex flex-row justify-center items-center px-4 text-base font-semibold rounded-lg transition py-[10px]",
        className,
        {
          "text-white bg-indigo-600 hover:bg-indigo-700":
            variant === "primary" && !loading && !disabled,
          "bg-slate-100 text-slate-900 hover:bg-slate-200":
            variant === "secondary" && !loading && !disabled,
          "bg-transparent text-slate-600 hover:bg-slate-100":
            variant === "tertiary" && !loading && !disabled,

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

          "py-3 px-3": onlyIcon,
        }
      )}
      disabled={disabled || loading}
      {...props}
    >
      {!onlyIcon && children}
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
    </motion.button>
  );
};

export default Button;
