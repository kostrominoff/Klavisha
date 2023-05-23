"use client";

import { ChangeEvent, useCallback, useMemo, useState } from "react";
import Input from "../input";
import { IOption } from "./option.interface";
import DropdownMenu from "./menu";
import { AnimatePresence } from "framer-motion";
import Icons from "../icons";

type Props<OptionValue> = {
  value?: OptionValue | null;
  onChange?: (value: OptionValue | null) => void;
  options?: IOption<OptionValue>[];
};

// TODO: Do nullable prop
// TODO: Create styles
// TODO: Do multiple prop

const Dropdown = <T,>({ value, onChange = () => null, options }: Props<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("");

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const inputChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setFilter(e.target.value);
      onChange(null);
    },
    [onChange]
  );

  const clearFilter = useCallback(() => setFilter(""), [setFilter]);

  const filteredOptions = options?.filter((option) =>
    option.label.toString().toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="inline-block relative" onBlur={close}>
      <Input
        value={
          filter || options?.find((option) => option.value === value)?.label
        }
        onFocus={open}
        onChange={inputChangeHandler}
        iconRight={
          <button className="flex" onClick={() => console.log("fff")}>
            <Icons.arrowDown />
          </button>
        }
      />
      <AnimatePresence>
        {isOpen && (
          <DropdownMenu
            onChange={(value) => onChange(value)}
            value={value}
            options={filteredOptions}
            clearFilter={clearFilter}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
