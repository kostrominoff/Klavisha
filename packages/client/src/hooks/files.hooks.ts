import Api from "@/services";
import { useMutation } from "@tanstack/react-query";

export const useFilesUpload = () => {
  return useMutation({
    mutationFn: Api.files.upload,
    mutationKey: ["files"],
  });
};
