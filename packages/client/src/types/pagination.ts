export type Pagination<T> = {
  pages: number;
  count: number;
} & T;

export type PaginationParams = {
  limit?: number;
  page?: number;
};
