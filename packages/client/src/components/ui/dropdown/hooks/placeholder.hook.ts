import { IOption } from "../option.interface";
import { isArray } from "../utils/is-array.util";

type Arguments<T> = {
  multiple?: boolean;
  value: T[] | T | null;
  options?: IOption<T>[];
  placeholder?: string;
};
export const usePlaceholder = <T>({
  multiple,
  value,
  options,
  placeholder,
}: Arguments<T>) => {
  if (multiple && isArray(value) && value.length)
    return `${value.length} выбрано`;

  const singleValue = options?.find((option) => option.value === value)?.label;
  if (singleValue) return String(singleValue);

  return placeholder || "";
};
