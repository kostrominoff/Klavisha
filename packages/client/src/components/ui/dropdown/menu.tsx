import { motion } from "framer-motion";
import { IOption } from "./option.interface";

type Props<OptionValue> = {
  value?: OptionValue | null;
  onChange?: (value: OptionValue | null) => void;
  options?: IOption<OptionValue>[];
  clearFilter: () => void;
};

const DropdownMenu = <T,>({
  value,
  onChange = () => null,
  options,
  clearFilter
}: Props<T>) => {
  return (
    <motion.div
      className="overflow-hidden absolute top-full p-1 w-full rounded-xl shadow-lg mt-[2px]"
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
        {options?.map((option) => (
          <li key={String(option.value)}>
            <button
              onClick={() => {
                onChange(option.value);
                clearFilter();
              }}
            >
              {option.label}
            </button>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default DropdownMenu;
