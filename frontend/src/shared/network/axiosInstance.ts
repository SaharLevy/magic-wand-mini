import axios from "axios";
import { toast } from "sonner";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const data = error.response?.data;
    const details = data?.details as string[] | undefined;

    if (details && details.length > 0)
      toast.error(`יש ${details.length} שדות חובה שלא מולאו`);
    else toast.error(data?.message ?? "משהו השתבש");

    return Promise.reject(error);
  },
);

export default axiosInstance;
