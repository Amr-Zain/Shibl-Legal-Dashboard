 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
 // @ts-nocheck
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useContext } from "react";
import { useIsRTL } from "./useIsRTL";
import { useTranslation } from "react-i18next";
import { AuthContext } from "@/context/AuthProvider";
import { toast } from "sonner";

type useMutateProps_TP<response_T> = {
  endpoint: string;
  mutationKey: [string];
  onSuccess?: (data: response_T) => void;
  onError?: (err: unknown) => void;
  formData?: boolean;
  onMutate?: (err?: unknown) => void;
  method?: "post" | "delete"| "put";
  headers?: Record<string, string>; 
  general?: boolean;
};

export function useMutate<response_T>({
  general,
  endpoint,
  mutationKey,
  onError: originalOnError,
  onSuccess,
  formData,
  onMutate,
  method = "post", // Set a default value for the method
  headers = {}, // Default headers to an empty object
}: useMutateProps_TP<response_T>) {
  const { logout } = useContext(AuthContext)!;
  const { t } = useTranslation();

  const user_token = localStorage.getItem('token') ||Cookies.get("token");
  const token = user_token;
  const authorizationHeader = `Bearer ${token}`;
  const baseURL = import.meta.env.VITE_BASE_URL;
  const baseURLGeneral = import.meta.env.VITE_BASE_GENERAL_URL;

  const enhancedOnError = (err) => {
    if (err.response?.status === 401) {
      toast(t("session_expired"), {
        description: "SpleaseLogin",
      });
      logout();
      window.location.replace("/login");
    }
    if (originalOnError) return originalOnError(err);
   
  };
  const isRTL = useIsRTL();

  const { data, isPending, isSuccess, mutate, mutateAsync, failureReason, isError } =
    useMutation({
      mutationKey,
      mutationFn: async(values) => {
        console.log(values);
        const requestConfig = {
          method: method.toUpperCase(), // Use the specified method
          url: `${general ? baseURLGeneral : baseURL}/${endpoint}`,
          data: values,
          headers: formData
            ? {
                ...headers,
                "Content-Type": "multipart/form-data",
                Accept: "application/json",
                Authorization: authorizationHeader,
                "Accept-Language": isRTL ? "ar" : "en",
              }
            : {
                "Content-Type": "application/json; charset=utf-8",
                Accept: "application/json",
                Authorization: authorizationHeader,
                "Accept-Language": isRTL ? "ar" : "en",
              },
        };

        return await axios(requestConfig);
      },
      onSuccess,
      onError: enhancedOnError,
      onMutate,
    });
  return { data, isPending, isSuccess, mutate, mutateAsync,failureReason, isError };
}
