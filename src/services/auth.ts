import { useMutation } from "@tanstack/react-query";
import { apiClient } from "./api";
import { AxiosError } from "axios";

interface ICreateUserParams {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
interface ICheckUserExist {
  email?: string;
  phone?: string;
  isEmail: boolean;
}

interface IAuthUserResponse {
  status: string;
  token: string;
  message: string | null;
}
interface IErrorResponse {
  status: string;
  message: string;
}

// Login
interface ILoginParams {
  email: string;
  password: string;
}

const createUser = async ({
  name,
  email,
  password,
  confirmPassword,
}: ICreateUserParams) => {
  const response = await apiClient.post(`signup`, {
    name,
    email,
    password,
    confirmPassword,
  });
  return response.data;
};

const checkUserExist = async ({ email, isEmail, phone }: ICheckUserExist) => {
  const response = await apiClient.post(`checkUserExist`, {
    email,
    isEmail,
    phone,
  });
  return response.data;
};

const login = async ({ email, password }: ILoginParams) => {
  const response = await apiClient.post(`login`, {
    email,
    password,
  });
  return response.data;
};

export const useCreateUserMutation = () => {
  return useMutation<
    IAuthUserResponse,
    AxiosError<IErrorResponse>,
    ICreateUserParams
  >({
    mutationFn: createUser,
  });
};

export const useCheckUserExist = () => {
  return useMutation<
    IErrorResponse,
    AxiosError<IErrorResponse>,
    ICheckUserExist
  >({
    mutationFn: checkUserExist,
  });
};

export const useLogin = () => {
  return useMutation<
    IAuthUserResponse,
    AxiosError<IErrorResponse>,
    ILoginParams
  >({
    mutationFn: login,
  });
};
