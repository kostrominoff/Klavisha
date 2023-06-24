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
  fullWidth?: boolean;
  onFilterChange?: (filter: string) => void;
  filter?: string;
  disableFilter?: boolean;
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
  fullWidth,
  customRef,
  filter: controlledFilter,
  onFilterChange,
  disableFilter,
  ...props
}: DropdownProps<T> & { customRef?: Ref<HTMLInputElement> }) => {
  const [localValue, setLocalValue] = useState<T[] | T | null>(
    value ? value : multiple ? [] : null
  );
  const [isOpen, { setTrue: open, setFalse: close }] = useBoolean();
  const [filter, setFilter] = useState(controlledFilter || "");

  useEffect(() => {
    if (!onFilterChange) return;
    onFilterChange(filter);
  }, [filter, onFilterChange]);

  const filteredOptions = useFilter(
    filter,
    options,
    !filter ? limit : undefined,
    disableFilter
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

  const changeHandler = useCallback(
    (value: T | null) => {
      setLocalValue((prev) => {
        if (multiple && isArray(prev) && value) {
          // If multiple
          if (prev.includes(value)) {
            // Remove element
            return prev.filter((element) => element !== value);
          } else {
            // Add element
            return [...prev, value];
          }
        } else {
          // If not multiple
          return value;
        }
      });

      // Close if not multiple
      if (!multiple) close();
    },
    [multiple, close]
  );

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
    <div
      className={clsx("inline-block", {
        "w-full": fullWidth,
      })}
    >
      <div
        className="inline-block relative"
        onFocus={open}
        onBlur={blurHandler}
      >
        <Input
          className={clsx({
            "placeholder:text-slate-900":
              multiple && isArray(localValue) ? localValue.length : localValue,
          })}
          fullWidth={fullWidth}
          value={filter}
          onChange={inputChangeHandler}
          placeholder={inputPlaceholder}
          error={error}
          label={label}
          ref={customRef}
          iconRight={
            <button tabIndex={-1} type="button" className="flex" onClick={open}>
              <Icons.arrowDown />
            </button>
          }
          {...props}
        />
        <AnimatePresence>
          {isOpen && (
            <DropdownMenu
              onChange={changeHandler}
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
    </div>
  );
};

export default Dropdown;
