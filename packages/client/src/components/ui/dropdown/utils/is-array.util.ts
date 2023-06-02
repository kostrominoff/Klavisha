export const isArray = <T>(value: T[] | T | null): value is T[] =>
  Array.isArray(value);
