import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useIsRTL } from "./useIsRTL";

export interface APIResponse<T> {
  data: T;
}

type UseFetchProps<T, R = APIResponse<T>> = {
  queryKey: string[];
  endpoint: string;
  enabled?: boolean;
  select?: (data: APIResponse<T>) => R;
  onError?: (err: AxiosError) => void;
  onSuccess?: (data: R) => void;
  general?: boolean;
};

const createAxiosInstance = (baseURL: string, isRTL: boolean, logout: () => void) => {
  const instance = axios.create({
    baseURL,
    headers: {
      "Accept-Language": isRTL ? "ar" : "en",
    },
  });

  instance.interceptors.request.use(
    (config) => {
      const token = Cookies.get("token");
      console.log('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        logout(); 
        window.location.replace("/login");
        return Promise.reject(new axios.Cancel('No token found, redirecting to login.'));
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        Cookies.remove("token"); 
        logout();
        window.location.replace("/login");
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

function useFetch<T, R = APIResponse<T>>({
  general,
  endpoint,
  enabled,
  select,
  queryKey,
  onError: originalOnError, 
  onSuccess,
}: UseFetchProps<T, R>) {
  const { logout } = useContext(AuthContext)!; 
  const isRTL = useIsRTL();
  const baseURL = general
    ? import.meta.env.VITE_BASE_GENERAL_URL
    : import.meta.env.VITE_BASE_URL;

  const api = createAxiosInstance(baseURL, isRTL, logout);

  return useQuery<APIResponse<T>, AxiosError, R>({
    queryKey: [...queryKey, isRTL],
    queryFn: async () => { 
      return await api.get<APIResponse<T>>(endpoint);
    },
    enabled,
    select,
    gcTime: 1000 * 60 * 60, 
    
    onError: (err: AxiosError) => {
      if (err.response?.status === 401) {
        logout();
      }
      originalOnError?.(err);
    },
    onSuccess: (data: R) => {
      onSuccess?.(data); 
    },
  });
}

export default useFetch;