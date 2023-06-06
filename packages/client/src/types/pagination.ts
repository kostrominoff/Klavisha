export type Pagination<T> = {
  pages: number;
  count: number;
} & T;
