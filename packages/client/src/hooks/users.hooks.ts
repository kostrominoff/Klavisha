import { notify } from "@/components/layouts/toast";
import Api from "@/services";
import { errorHandler } from "@/utils/error.handler";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useCreateUser = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ["User"],
    mutationFn: Api.users.create,
    onSuccess() {
      notify("Пользователь создан!", "success");
      router.replace("/users");
      router.refresh();
    },
    onError: errorHandler,
  });
};
