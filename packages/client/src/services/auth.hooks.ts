import { useMutation } from "@tanstack/react-query";
import Api from ".";
import { useRouter } from "next/navigation";
import { notify } from "@/components/layouts/toast";

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: Api.auth.login,
    mutationKey: ["Login"],
    onSuccess: () => {
      notify("Авторизация прошла успешно!", "success");
      router.replace("/");
    },
    onError: (e: any) => {
      const message = e?.response?.data?.message;
      if (message) return notify(message, "error");
      notify("Что-то пошло не так!");
    },
  });
};

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: Api.auth.register,
    mutationKey: ["Register"],
    onSuccess: () => {
      notify("Регистрация прошла успешно!", "success");
      router.replace("/");
    },
    onError: (e: any) => {
      const message = e?.response?.data?.message;
      if (message) return notify(message, "error");
      notify("Что-то пошло не так!");
    },
  });
};
