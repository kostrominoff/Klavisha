import { notify } from "@/components/layouts/toast";
import Api from "@/services";
import { errorHandler } from "@/utils/error.handler";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useCreateInstitution = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: Api.institutions.create,
    mutationKey: ["Institution"],
    onSuccess: () => {
      notify("Учебное заведение создано!", "success");
      router.replace("/institutions");
      router.refresh();
    },
    onError: errorHandler,
  });
};

export const useDeleteInstitution = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: Api.institutions.delete,
    mutationKey: ["Institution"],
    onSuccess: () => {
      notify("Учебное заведение удалено!", "success");
      router.replace("/institutions");
      router.refresh();
    },
    onError: errorHandler,
  });
};
