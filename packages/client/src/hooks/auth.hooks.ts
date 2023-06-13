import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { notify } from "@/components/layouts/toast";
import Api from "@/services";
import { errorHandler } from "@/utils/error.hangler";

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: Api.auth.login,
    mutationKey: ["Login"],
    onSuccess: () => {
      notify("Авторизация прошла успешно!", "success");
      router.replace("/");
    },
    onError: errorHandler,
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
    onError: errorHandler,
  });
};
