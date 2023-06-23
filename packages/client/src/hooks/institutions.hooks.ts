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
      router.replace("/institutions");
    },
    onError: errorHandler,
  });
};
