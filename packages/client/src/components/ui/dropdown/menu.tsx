import { AnimatePresence, motion } from "framer-motion";
import { DropdownProps } from ".";
import MenuItem from "./item";
import { isArray } from "./utils/is-array.util";

type Props<OptionValue> = Omit<DropdownProps<OptionValue>, "onChange"> & {
  clearFilter: () => void;
  onChange: (value: OptionValue | null) => void;
};

const DropdownMenu = <T,>({
  value,
  multiple,
  onChange,
  options,
  clearFilter,
  nullable,
  placeholder,
}: Props<T>) => {
  return (
    <motion.ul
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      className="flex overflow-hidden overflow-y-scroll absolute right-0 left-0 top-full z-10 flex-col p-1 bg-white rounded-xl shadow-lg gap-[2px] max-h-[234px] mt-[2px] scrollbar-hide"
    >
      <AnimatePresence>
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
            onClick={(newValue) => {
              onChange && onChange(newValue);
              clearFilter();
            }}
            isSelected={
              multiple && isArray(value)
                ? value.includes(option.value)
                : value === option.value
            }
            multiple={multiple}
            value={option.value}
            key={String(option.value)}
          >
            {option.label}
          </MenuItem>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
};

export default DropdownMenu;
