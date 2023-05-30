import { ReactNode } from "react";
import Typography from "../typography";
import clsx from "clsx";
import Icons from "../icons";
import { AnimatePresence, motion } from "framer-motion";

type Props<OptionValue> = {
  value: OptionValue;
  onClick: (value: OptionValue) => void;
  children?: ReactNode;
  isSelected: boolean;
  multiple?: boolean;
};

const MenuItem = <T,>({
  value,
  onClick,
  isSelected,
  multiple,
  children,
}: Props<T>) => {
  return (
    <li className="block">
      <button
        className={clsx(
          "block px-4 w-full text-left rounded-lg transition cursor-pointer py-[9px] hover:bg-slate-100",
          {
            "bg-indigo-100": isSelected && !multiple,
          }
        )}
        onClick={() => onClick(value)}
      >
        <Typography
          className="flex items-center cursor-pointer"
          tag="span"
          variant="text3"
        >
          <AnimatePresence>
            {isSelected && multiple && (
              <motion.span
                initial={{
                  opacity: 0,
                  width: 0,
                  marginRight: 0,
                }}
                animate={{
                  width: "auto",
                  opacity: 1,
                  marginRight: "0.5rem",
                }}
                exit={{
                  opacity: 0,
                  width: 0,
                  marginRight: 0,
                }}
              >
                <Icons.check />
              </motion.span>
            )}
          </AnimatePresence>
          {children}
        </Typography>
      </button>
    </li>
  );
};

export default MenuItem;
