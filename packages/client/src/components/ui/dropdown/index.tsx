"use client";

import { AnimatePresence } from "framer-motion";
import {
  ChangeEvent,
  FocusEvent,
  InputHTMLAttributes,
  Ref,
  useCallback,
  useEffect,
  useState,
} from "react";
import Icons from "../icons";
import Input from "../input";
import DropdownMenu from "./menu";
import { IOption } from "./option.interface";
import clsx from "clsx";
import { useFilter } from "./hooks/filter.hook";
import { useBoolean } from "../../../hooks/boolean.hook";
import { isArray } from "./utils/is-array.util";
import { usePlaceholder } from "./hooks/placeholder.hook";

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
  customRef,
  ...props
}: DropdownProps<T> & { customRef?: Ref<HTMLInputElement> }) => {
  const [localValue, setLocalValue] = useState<T[] | T | null>(
    value || multiple ? [] : null
  );
  const [isOpen, { setTrue: open, toggle: toggleOpen, setFalse: close }] =
    useBoolean();
  const [filter, setFilter] = useState("");

  const filteredOptions = useFilter(
    filter,
    options,
    !filter ? limit : undefined
  );

  const inputPlaceholder = usePlaceholder({
    value: localValue,
    options,
    multiple,
    placeholder,
  });

  const inputChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  }, []);

  const clearFilter = useCallback(() => {
    setFilter("");
  }, []);

  const blurHandler = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      if (!multiple) return close();
      if (!event.currentTarget.contains(event.relatedTarget)) close();
    },
    [multiple, close]
  );

  useEffect(() => {
    if (!onChange) return;
    if (isArray(localValue) && multiple) onChange(localValue);
    else if (!nullable && !multiple && !isArray(localValue) && localValue)
      onChange(localValue);
    else if (
      !multiple &&
      !isArray(localValue) &&
      nullable &&
      localValue === null
    )
      onChange(localValue);
  }, [localValue, onChange, nullable, multiple]);

  return (
    <div className="inline-block relative" onBlur={blurHandler}>
      <Input
        className={clsx({
          "placeholder:text-slate-900":
            multiple && isArray(localValue) ? localValue.length : localValue,
        })}
        value={filter}
        onFocus={open}
        onChange={inputChangeHandler}
        placeholder={inputPlaceholder}
        error={error}
        label={label}
        ref={customRef}
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
                if (multiple && isArray(prev) && newValue) {
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
