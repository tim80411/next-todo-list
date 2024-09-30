// src/hooks/useToastState.ts
import { AlertColor } from "@mui/material";
import { useState } from "react";

interface ToastOptions {
  duration?: number;
  severity?: AlertColor;
}

interface ToastState {
  open: boolean;
  message: string;
  severity: AlertColor;
  duration: number;
}

export const useToastState = () => {
  const [state, setState] = useState<ToastState>({
    open: false,
    message: "",
    severity: "success",
    duration: 4000,
  });

  const showToast = (message: string, options: ToastOptions = {}) => {
    setState({
      open: true,
      message,
      severity: options.severity || "success",
      duration: options.duration || 4000,
    });
  };

  const hideToast = () => {
    setState((prev) => ({ ...prev, open: false }));
  };

  return {
    toastState: state,
    showToast,
    hideToast,
  };
};
