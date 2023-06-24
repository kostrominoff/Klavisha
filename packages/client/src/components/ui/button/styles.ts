import clsx from "clsx";
import { ButtonVariants } from ".";

export const style = {
  main: "inline-block text-base font-semibold rounded-lg transition",
  primary: "text-white bg-indigo-600 hover:bg-indigo-700",
  secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
  tertiary: "bg-transparent text-slate-600 hover:bg-slate-100",
};

export const ButtonStyles = (variant: ButtonVariants) =>
  clsx(style.main, {
    [style.primary]: variant === "primary",
    [style.secondary]: variant === "secondary",
    [style.tertiary]: variant === "tertiary",
  });
