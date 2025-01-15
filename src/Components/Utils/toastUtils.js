import { toast } from "react-toastify";
import "./toastUtils.css";

export const simpleErrorToast = (message, type = "error") => {
  toast(message, {
    className: "toast",
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
      className: "toast",
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
