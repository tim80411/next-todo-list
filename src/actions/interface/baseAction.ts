export interface BaseResponse<T> {
  success: boolean;
  error?: string;
  debugInfo?: object;
  data?: T;
}
