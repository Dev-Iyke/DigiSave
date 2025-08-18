import { useMutation } from "@tanstack/react-query";
import { axiosInstance, CustomAxiosRequestConfig } from "..";
import { CreateNewPasswordProps, SignInProps } from "@/interfaces/onboarding";

export function useSignIn() {
  return useMutation({
    mutationFn: ({payload}: {payload: SignInProps}) => {
      return axiosInstance.post(`/users/login`, payload, {noAuth: true, noToast: false} as CustomAxiosRequestConfig);
    },
  })
}

export function useRequestEmail() {
  return useMutation({
    mutationFn: (email: string) => {
      return axiosInstance.post(`/users/request-email`, {email}, {noAuth: true, noToast: false} as CustomAxiosRequestConfig);
    },
  })
}

export function useCodeVerification() {
  return useMutation({
    mutationFn: ({code}: {code: string}) => {
      return axiosInstance.post(`/users/verify-code`, code, {noAuth: true, noToast: false} as CustomAxiosRequestConfig);
    },
  })
}

export function useCreateNewPassword() {
  return useMutation({
    mutationFn: ({payload}: {payload: CreateNewPasswordProps}) => {
      return axiosInstance.post(`/users/reset-password`, payload, {noAuth: true, noToast: false} as CustomAxiosRequestConfig);
    },
  })
}