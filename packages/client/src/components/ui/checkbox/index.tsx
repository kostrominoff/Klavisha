import { InputHTMLAttributes, forwardRef } from "react";
import Typography from "../typography";
import Icons from "../icons";
import clsx from "clsx";

type Props = {
  label?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "placeholder">;

const Checkbox = forwardRef<HTMLInputElement, Props>(
  ({ label, className, disabled, ...props }, ref) => {
    return (
      <div className="inline-block">
        <label
          className={clsx(
            "flex items-center select-none",
            { "cursor-not-allowed": disabled, "cursor-pointer": !disabled },
            className
          )}
        >
          <input
            className="appearance-none outline-none peer"
            type="checkbox"
            ref={ref}
            disabled={disabled}
            {...props}
          />
          <div
            aria-label="none"
            tabIndex={-1}
            className="flex justify-center items-center mr-2 w-5 h-5 rounded-md border transition peer-disabled:bg-slate-300 peer-disabled:border-transparent peer-disabled:cursor-not-allowed peer-focus:ring-2 peer-focus:ring-indigo-200 peer-checked:border-none peer-checked:bg-indigo-500 border-slate-500"
          >
            <Icons.checkbox />
          </div>
          {label && (
            <Typography
              tabIndex={-1}
              className="peer-disabled:text-slate-400"
              tag="span"
              variant="text2"
            >
              {label}
            </Typography>
          )}
        </label>
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
