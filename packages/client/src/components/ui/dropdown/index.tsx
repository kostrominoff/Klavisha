"use client";

import { AnimatePresence } from "framer-motion";
import {
  ChangeEvent,
  FocusEvent,
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

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const inputChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  }, []);

  const clearFilter = useCallback(() => {
    setFilter("");
  }, []);

  const blurHandler = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      if (!multiple) return setIsOpen(false);

      if (!event.currentTarget.contains(event.relatedTarget)) setIsOpen(false);
    },
    [multiple]
  );

  useEffect(() => {
    if (!onChange) return;

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
    <div className="inline-block relative" onBlur={blurHandler}>
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
          multiple && Array.isArray(localValue) && localValue.length
            ? `${localValue.length} выбрано`
            : placeholder
        }
        error={error}
        label={label}
        iconRight={
          <button type="button" className="flex" onClick={toggleOpen}>
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
                  // If multiple
                  if (prev.includes(newValue)) {
                    // Remove element
                    return prev.filter((element) => element !== newValue);
                  } else {
                    // Add element
                    return [...prev, newValue];
                  }
                } else {
                  // If not multiple
                  return newValue;
                }
              })
            }
            value={localValue}
            multiple={multiple}
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
