import { ReactNode } from "react";
import Typography from "../typography";
import clsx from "clsx";

type Props<OptionValue> = {
  value: OptionValue;
  onClick: (value: OptionValue) => void;
  children?: ReactNode;
  isSelected: boolean;
};

const MenuItem = <T,>({ value, onClick, isSelected, children }: Props<T>) => {
  return (
    <li className="block">
      <button
        className={clsx(
          "block px-4 w-full text-left rounded-lg transition cursor-pointer py-[9px] hover:bg-slate-100",
          {
            "bg-indigo-100": isSelected,
          }
        )}
        onClick={() => onClick(value)}
      >
        <Typography className="cursor-pointer" tag="span" variant="text3">
          {children}
        </Typography>
      </button>
    </li>
  );
};

export default MenuItem;
