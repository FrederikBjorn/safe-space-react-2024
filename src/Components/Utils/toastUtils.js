import { toast } from "react-toastify";

export const simpleErrorToast = (message, type = "error") => {
  toast(message, {
    type: "error", // Accepts "success", "error", "info", "warning", etc.
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
    style: {
        color: "black",
    },
  });
};

export const simpleSuccessToast = (message, type = "success") => {
    toast(message, {
      type: "success", // Accepts "success", "error", "info", "warning", etc.
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      style: {
        color: "black",
      },
    });
  };
