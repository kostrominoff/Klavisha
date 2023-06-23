import { notify } from "@/components/layouts/toast";

export const errorHandler = (e: unknown) => {
  const message = (e as any)?.response?.data?.message;
  if (message) return notify(message, "error");
  notify("Что-то пошло не так!");
};
