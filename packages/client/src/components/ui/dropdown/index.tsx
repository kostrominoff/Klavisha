"use client";

import { AnimatePresence } from "framer-motion";
import {
  ChangeEvent,
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from "react";
import Icons from "../icons";
import Input from "../input";
import DropdownMenu from "./menu";
import { IOption } from "./option.interface";

type DropdownBaseType<OptionValue> = {
  placeholder?: string;
  options?: IOption<OptionValue>[];
  error?: string;
  label?: string;
};

type NotNullableDropdown<OptionValue> = {
  value?: OptionValue;
  onChange?: (value: OptionValue) => void;
  nullable?: false;
};

type NullableDropdown<OptionValue> = {
  value?: OptionValue | null;
  onChange?: (value: OptionValue | null) => void;
  nullable: true;
};

export type DropdownProps<OptionValue> = (
  | NullableDropdown<OptionValue>
  | NotNullableDropdown<OptionValue>
) &
  DropdownBaseType<OptionValue> &
  Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange" | "placeholder"
  >;

const Dropdown = <T,>({
  value,
  placeholder,
  nullable,
  onChange,
  options,
  label,
  error,
  ...props
}: DropdownProps<T>) => {
  const [localValue, setLocalValue] = useState<T | null>(value || null);
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("");

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const inputChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    setLocalValue(null);
  }, []);

  const clearFilter = useCallback(() => {
    setFilter("");
  }, []);

  useEffect(() => {
    if (!onChange) return;

    if (localValue) onChange(localValue);
    else if (nullable && !localValue) onChange(localValue);
  }, [localValue, onChange, nullable]);

  const filteredOptions = options?.filter((option) =>
    option.label.toString().toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="inline-block relative" onBlur={close}>
      <Input
        value={
          filter ||
          options?.find((option) => option.value === localValue)?.label ||
          ""
        }
        onFocus={open}
        onChange={inputChangeHandler}
        placeholder={placeholder}
        error={error}
        label={label}
        iconRight={
          <button className="flex" onClick={open}>
            <Icons.arrowDown />
          </button>
        }
        {...props}
      />
      <AnimatePresence>
        {isOpen && (
          <DropdownMenu
            onChange={setLocalValue}
            value={localValue}
            options={filteredOptions}
            clearFilter={clearFilter}
            placeholder={placeholder}
            nullable={nullable}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
