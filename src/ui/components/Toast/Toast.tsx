import type { ToastItem, ToastVariant } from "@/store/toastStore";
import styles from "./Toast.module.css";

type ToastProps = {
  toast: ToastItem;
  onDismiss: (id: string) => void;
};

const variantClasses: Record<ToastVariant, string> = {
  error: styles.error,
  success: styles.success,
  info: styles.info,
};

export function Toast({ toast, onDismiss }: Readonly<ToastProps>) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`${styles.toast} ${variantClasses[toast.variant]}`}
    >
      <p className={styles.message}>{toast.message}</p>
      <button
        type="button"
        aria-label="Dismiss notification"
        className={styles.closeButton}
        onClick={() => onDismiss(toast.id)}
      >
        &times;
      </button>
    </div>
  );
}