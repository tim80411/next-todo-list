export type BaseResponse<T> = {
  success: boolean;
  error?: string;
  debugInfo?: object;
  data?: T;
};

export interface BasePagination<T> {
  records: T[];
  currentPage: number;
  totalPages: number;
  totalAmount: number;
}

export interface BasePaginatedResponse<
  T,
  U extends BasePagination<T> = BasePagination<T>,
> extends BaseResponse<U> {}
