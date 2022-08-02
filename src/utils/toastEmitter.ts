import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const emitSuccess = (message: string) => {
  toast.success(message, {
    position: "bottom-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
  });
};

const emitError = (message: string) => {
  toast.error(message, {
    position: "bottom-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
  });
};

export function toastEmit({
  type,
  message,
}: {
  type: "success" | "error";
  message: string;
}) {
  type === "success" ? emitSuccess(message) : emitError(message);
}
