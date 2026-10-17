import { useState } from "react";

export type ToastType = "success" | "info" | "error";

export const useToast = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [type, setType] = useState<ToastType>("info");
  const [visible, setVisible] = useState(false);

  const showToast = (
    msg: string,
    toastType: ToastType = "info",
    duration = 3000
  ) => {
    setMessage(msg);
    setType(toastType);
    setVisible(true);

    setTimeout(() => {
      setVisible(false);
    }, duration);
  };

  return {
    message,
    type,
    visible,
    showToast
  };
};