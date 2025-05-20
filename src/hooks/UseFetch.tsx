 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
 // @ts-nocheck
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useIsRTL } from "./useIsRTL";

type useFetchPops_TP = {
  queryKey: [string];
  endpoint: string;
  enabled?: boolean;
  select?: ((data: unknown) => unknown) | undefined;
  onError?: (err: unknown) => void;
  onSuccess?: (err: unknown) => void;
  localization?: boolean;
  useCompunknownToken?: boolean;
  specificToken?: string;
  general?: boolean;
};
function useFetch<T>({
  general,
  endpoint,
  enabled,
  select,
  queryKey,
  onError: originalOnError,
  onSuccess,
}: useFetchPops_TP) {
  const { logout } = useContext(AuthContext)!;
  const user_token = Cookies.get("token");
  const token = user_token;
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
  const query = useQuery<T>({
    queryKey: [...queryKey, isRTL],
    queryFn: () =>
      axios
        .get(`${general ? baseURLGeneral : baseURL}/${endpoint}`, config)
        .then((res: unknown) => res.data),

    enabled,
    select,
    cacheTime: 1000*60*60,
    onError: (err: unknown) => {
    
      if (err.response?.status === 401) {
        
        logout();
        window.location.replace("/login");
      }
      if (originalOnError) originalOnError(err);
    },
    onSuccess,
  });
  return query;
}

export default useFetch;
