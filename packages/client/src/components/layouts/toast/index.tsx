"use client";

import Icons from "@/components/ui/icons";
import { Toaster, toast } from "react-hot-toast";

export type Status = "error" | "success";

export const notify = (message: string, status?: Status) => {
  toast(message, {
    position: "top-right",
    icon:
      status &&
      (status === "success" ? <Icons.notifySuccess /> : <Icons.notifyError />),
  });
};
export default Toaster;
