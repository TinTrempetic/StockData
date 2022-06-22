export interface PagedResult<T> {
  currentPage: number;
  pageCount: number;
  pageSize: number;
  totalRows: number;
  results: T[];
}
