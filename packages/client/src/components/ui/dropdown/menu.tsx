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
    <motion.div
      className="overflow-hidden overflow-y-scroll absolute top-full p-1 w-full rounded-xl shadow-lg max-h-[234px] mt-[2px] scrollbar-hide"
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
        <AnimatePresence>
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
      </ul>
    </motion.div>
  );
};

export default DropdownMenu;
