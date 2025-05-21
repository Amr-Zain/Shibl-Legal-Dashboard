
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError, type AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useIsRTL } from "./useIsRTL";

export interface APIResponse<T> {
  data: T;
}

type UseFetchProps<T, R = T> = {
  queryKey: string[];
  endpoint: string;
  enabled?: boolean;
  select?: (data: APIResponse<T>) => R;
  onError?: (err: AxiosError) => void;
  onSuccess?: (data: R extends undefined ? APIResponse<T> : R) => void;
  general?: boolean;
};

function useFetch<T, R = T>({
  general,
  endpoint,
  enabled,
  select,
  queryKey,
  onError: originalOnError,
  onSuccess,
}: UseFetchProps<T, R>) {
  const { logout } = useContext(AuthContext)!;
  const token = Cookies.get("token");
  const authorizationHeader = `Bearer ${token}`;
  const baseURL = import.meta.env.VITE_BASE_URL;
  const baseURLGeneral = import.meta.env.VITE_BASE_GENERAL_URL;
  const isRTL = useIsRTL();

  const config = {
    headers: {
      Authorization: authorizationHeader,
      "Accept-Language": isRTL ? "ar" : "en",
    },
  };
  return useQuery<APIResponse<T>, AxiosError, R>({
    queryKey: [...queryKey, isRTL],
    queryFn: () =>
      axios
        .get<APIResponse<T>>(
          `${general ? baseURLGeneral : baseURL}/${endpoint}`,
          config
        )
        .then((res: AxiosResponse<APIResponse<T>>) => res.data),
    enabled,
    select,
    cacheTime: 1000 * 60 * 60,
    onError: (err: AxiosError) => {
      if (err.response?.status === 401) {
        logout();
        window.location.replace("/login");
      }
      originalOnError?.(err);
    },
    onSuccess: (data: unknown) => onSuccess?.(data as R extends undefined ? APIResponse<T> : R),
  });
}

export default useFetch;