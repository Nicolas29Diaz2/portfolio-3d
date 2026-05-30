import type { ToastItem, ToastVariant } from '@/store/toastStore'

type ToastProps = {
  toast: ToastItem
  onDismiss: (id: string) => void
}

const variantStyles: Record<ToastVariant, string> = {
  error: 'border-red-500/40 bg-red-950/90 text-red-100',
  success: 'border-accent/40 bg-surface/95 text-foreground',
  info: 'border-border bg-surface/95 text-foreground',
}

export function Toast({ toast, onDismiss }: ToastProps) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-lg border px-4 py-3 shadow-lg backdrop-blur-sm ${variantStyles[toast.variant]}`}
    >
      <p className="flex-1 text-sm leading-snug">{toast.message}</p>
      <button
        type="button"
        aria-label="Dismiss notification"
        className="text-muted transition-colors hover:text-foreground"
        onClick={() => onDismiss(toast.id)}
      >
        ×
      </button>
    </div>
  )
}
