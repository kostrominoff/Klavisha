import { IOption } from "../option.interface";

export const useFilter = <T>(
  filter: string,
  options?: IOption<T>[],
  limit?: number
) => {
  return options
    ?.filter((option) =>
      option.label.toString().toLowerCase().includes(filter.toLowerCase())
    )
    .slice(0, limit);
};
