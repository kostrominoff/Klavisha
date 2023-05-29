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
    if (!multiple && !Array.isArray(localValue)) setLocalValue(null);
  }, []);

  const clearFilter = useCallback(() => {
    setFilter("");
  }, []);

  useEffect(() => {
    if (!onChange) return;

    console.log(multiple && Array.isArray(localValue), 1);
    console.log(
      !nullable && !multiple && !Array.isArray(localValue) && localValue,
      2
    );
    console.log(
      !multiple &&
        !Array.isArray(localValue) &&
        nullable &&
        localValue === null,
      3
    );

    // FIX: no event after search

    if (multiple && Array.isArray(localValue)) onChange(localValue);
    else if (!nullable && !multiple && !Array.isArray(localValue) && localValue)
      onChange(localValue);
    else if (
      !multiple &&
      !Array.isArray(localValue) &&
      nullable &&
      localValue === null
    )
      onChange(localValue);
  }, [localValue, onChange, nullable, multiple]);

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
          (!multiple &&
            !Array.isArray(localValue) &&
            options?.find((option) => option.value === localValue)?.label) ||
          ""
        }
        onFocus={open}
        onChange={inputChangeHandler}
        placeholder={
          multiple && Array.isArray(localValue)
            ? `${localValue.length} выбрано`
            : placeholder
        }
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
                  console.log("multiple");
                  if (prev.includes(newValue)) {
                    console.log("includes");
                    return prev.filter((element) => element !== newValue);
                  } else {
                    console.log("not includes (add item)");
                    return [...prev, newValue];
                  }
                } else {
                  console.log("Just set value");
                  return newValue;
                }
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
