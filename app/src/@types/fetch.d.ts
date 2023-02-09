export interface IReturnFetch<T> {
  success: boolean;
  message: string;
  data: T[];
}
