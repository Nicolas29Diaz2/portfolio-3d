import { useToastStore } from '@/store/toastStore'
import { Toast } from './Toast'

export function ToastContainer() {
  const toasts = useToastStore((state) => state.toasts)
  const dismissToast = useToastStore((state) => state.dismissToast)

  if (toasts.length === 0) return null

  return (
    <div
      aria-label="Notifications"
      className="pointer-events-none fixed right-4 top-4 z-50 flex w-[min(100%,24rem)] flex-col gap-2"
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={dismissToast} />
      ))}
    </div>
  )
}
