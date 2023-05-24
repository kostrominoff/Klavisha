import { motion } from "framer-motion";
import { DropdownProps } from ".";
import MenuItem from "./item";

type Props<OptionValue> = {
  clearFilter: () => void;
} & DropdownProps<OptionValue>;
const DropdownMenu = <T,>({
  value,
  onChange,
  options,
  clearFilter,
  nullable,
  placeholder,
}: Props<T>) => {
  return (
    <motion.div
      className="overflow-hidden overflow-y-scroll absolute top-full p-1 w-full rounded-xl shadow-lg max-h-[234px] mt-[2px]"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
    >
      <ul className="flex flex-col gap-[2px]">
        {nullable && (
          <MenuItem
            value={null}
            onClick={(value) => {
              onChange && onChange(value);
              clearFilter();
            }}
            isSelected={value === null}
          >
            {placeholder}
          </MenuItem>
        )}
        {options?.map((option) => (
          <MenuItem
            onClick={(value) => {
              onChange && onChange(value);
              clearFilter();
            }}
            isSelected={value === option.value}
            value={option.value}
            key={String(option.value)}
          >
            {option.label}
          </MenuItem>
        ))}
      </ul>
    </motion.div>
  );
};

export default DropdownMenu;
