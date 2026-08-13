import type { AxiosRequestConfig } from "axios";
import axiosInstance from "./axiosInstance";

export const request = async <T>(config: AxiosRequestConfig): Promise<T> => {
  const response = await axiosInstance(config);
  return response.data;
};
