import { IOption } from "../option.interface";

export const useFilter = <T>(
  filter: string,
  options?: IOption<T>[],
  limit?: number,
  disableFilter?: boolean
) => {
  return disableFilter
    ? options
    : options
        ?.filter((option) =>
          option.label.toString().toLowerCase().includes(filter.toLowerCase())
        )
        .slice(0, limit);
};
