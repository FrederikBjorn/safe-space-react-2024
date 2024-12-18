import { toast } from "react-toastify";
import "./Utilities.css"; 
import { Color } from "antd/es/color-picker";

export const simpleErrorToast = (message, type = "error") => {
  toast(message, {
    type, // Accepts "success", "error", "info", "warning", etc.
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    closeButton: ({ closeToast }) => (
      <button className="custom-toast-close" onClick={closeToast}>
        X
      </button>
    ),
  });
};

export const simpleSuccessToast = (message, type = "success") => {
    toast(message, {
      type, // Accepts "success", "error", "info", "warning", etc.
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "color",
      closeButton: ({ closeToast }) => (
        <button className="custom-toast-close" onClick={closeToast}>
          X
        </button>
      ),
    });
  };
