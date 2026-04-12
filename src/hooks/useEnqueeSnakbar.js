import { enqueueSnackbar } from "notistack";
import React from "react";

const baseStyle = {
  background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #a855f7 100%)",
  color: "white",
  fontWeight: "500",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
  padding: "12px 20px",
};

const successStyle = {
  background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
  color: "white",
  fontWeight: "500",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
  padding: "12px 20px",
};

const errorStyle = {
  background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
  color: "white",
  fontWeight: "500",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)",
  padding: "12px 20px",
};

const warningStyle = {
  background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
  color: "white",
  fontWeight: "500",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(245, 158, 11, 0.3)",
  padding: "12px 20px",
};

const infoStyle = {
  background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
  color: "white",
  fontWeight: "500",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
  padding: "12px 20px",
};

const useEnqueueSnackbar = () => {
  const alert = ({
    message,
    variant = "default",
    style = {},
    duration = 3000,
    anchorOrigin = { vertical: "bottom", horizontal: "right" },
  }) => {
    let finalStyle = baseStyle;

    switch (variant) {
      case "success":
        finalStyle = successStyle;
        break;
      case "error":
        finalStyle = errorStyle;
        break;
      case "warning":
        finalStyle = warningStyle;
        break;
      case "info":
        finalStyle = infoStyle;
        break;
      default:
        finalStyle = baseStyle;
    }

    enqueueSnackbar({
      message: message,
      variant: variant,
      anchorOrigin: anchorOrigin,
      style: { ...finalStyle, ...style },
      autoHideDuration: duration,
    });
  };

  return { alert };
};

export default useEnqueueSnackbar;

// useage example

// alert({
//   message: "Your appointment request has been submitted successfully! We will contact you soon.",
//   variant: "success",
//   duration: 5000, // optional, default is 3000ms
// });
