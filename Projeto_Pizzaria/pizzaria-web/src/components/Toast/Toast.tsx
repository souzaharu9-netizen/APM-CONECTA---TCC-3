import "./Toast.css";

interface ToastProps {
  message: string | null;
  type: "success" | "info" | "error";
  visible: boolean;
}

const Toast = ({ message, type, visible }: ToastProps) => {
  if (!message) return null;

  return (
    <div className={`toast toast-${type} ${visible ? "show" : ""}`}>
      {message}
    </div>
  );
};

export default Toast;