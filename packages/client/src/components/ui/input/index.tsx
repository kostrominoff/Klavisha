import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { InputHTMLAttributes, ReactNode, forwardRef, useId } from "react";
import Typography from "../typography";

type Props = {
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  label?: string;
  error?: string;
  fullWidth?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      error,
      className,
      iconLeft,
      iconRight,
      placeholder,
      fullWidth = false,
      ...props
    },
    ref
  ) => {
    const id = useId();
    return (
      <div
        className={clsx("inline-block", {
          "w-full": fullWidth,
        })}
      >
        {label && (
          <label htmlFor={id}>
            <Typography
              variant="text3"
              tag="span"
              className="block font-semibold text-slate-600"
            >
              {label}
            </Typography>
          </label>
        )}
        <div
          className={clsx(
            "flex justify-center items-center bg-white rounded-lg transition focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-200 border-[1px] border-slate-400 min-w-[200px] hover-within:border-slate-500 active-within:border-indigo-500 active-within:ring-2 active-within:ring-indigo-200",
            {
              "border-rose-400 focus-within:ring-rose-200 focus-within:border-rose-400 active-within:border-rose-400":
                error,
            }
          )}
        >
          {iconLeft && <div className="pl-3">{iconLeft}</div>}
          <input
            id={id}
            className={clsx(
              "px-3 w-full text-base rounded-lg border-none outline-none pointer-events-auto py-[10px] placeholder:text-slate-400 text-slate-900",
              className
            )}
            placeholder={placeholder}
            ref={ref}
            {...props}
          />
          {iconRight && <div className="relative z-50 mr-3">{iconRight}</div>}
        </div>
        <AnimatePresence>
          {error && (
            <motion.span
              initial={{
                height: 0,
              }}
              animate={{
                height: "auto",
              }}
              exit={{
                height: 0,
              }}
              className="block overflow-hidden text-base text-rose-600"
            >
              {error}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
