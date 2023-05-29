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
  limit?: number;
};

type NotNullableDropdown<OptionValue> = {
  value?: OptionValue;
  onChange?: (value: OptionValue) => void;
  nullable?: false;
  multiple?: false;
};

type NullableDropdown<OptionValue> = {
  value?: OptionValue | null;
  onChange?: (value: OptionValue | null) => void;
  nullable: true;
  multiple?: false;
};

type MultipleDropdown<OptionValue> = {
  value?: OptionValue[];
  onChange?: (value: OptionValue[]) => void;
  nullable?: false;
  multiple: true;
};

export type DropdownProps<OptionValue> = (
  | NullableDropdown<OptionValue>
  | NotNullableDropdown<OptionValue>
  | MultipleDropdown<OptionValue>
) &
  DropdownBaseType<OptionValue> &
  Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange" | "placeholder"
  >;

// TODO: Clear code and make selected icon if multiple

const Dropdown = <T,>({
  value,
  placeholder,
  nullable,
  onChange,
  options,
  label,
  multiple,
  error,
  limit,
  ...props
}: DropdownProps<T>) => {
  const [localValue, setLocalValue] = useState<T[] | T | null>(
    value || multiple ? [] : null
  );
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

    if (multiple && Array.isArray(localValue)) onChange(localValue);
    else if (!nullable && !multiple && !Array.isArray(localValue) && localValue)
      onChange(localValue);
    else if (nullable && !multiple && !localValue) onChange(localValue);

    // if (localValue) onChange(localValue);
    // else if (nullable && !localValue && !filter) onChange(localValue);
  }, [localValue, onChange, nullable, filter, multiple]);

  const filteredOptions = options
    ?.filter((option) =>
      option.label.toString().toLowerCase().includes(filter.toLowerCase())
    )
    .slice(0, limit);

  return (
    <div className="inline-block relative" onBlur={close}>
      <Input
        value={
          filter ||
          (multiple && Array.isArray(localValue)
            ? localValue.length
              ? `${localValue.length} выбрано`
              : ""
            : options?.find((option) => option.value === localValue)?.label) ||
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
            onChange={(newValue) =>
              setLocalValue((prev) => {
                if (multiple && Array.isArray(prev) && newValue) {
                  if (prev.includes(newValue)) {
                    return prev.filter((element) => element !== newValue);
                  } else return [...prev, newValue];
                } else return newValue;
              })
            }
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
