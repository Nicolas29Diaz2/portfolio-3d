import { create } from 'zustand'
import type { AppError } from '@/core/api/errors'

export type ToastVariant = 'error' | 'success' | 'info'

export type ToastItem = {
  id: string
  message: string
  variant: ToastVariant
}

type ToastStore = {
  toasts: ToastItem[]
  showToast: (message: string, variant?: ToastVariant) => void
  showError: (error: AppError | string) => void
  dismissToast: (id: string) => void
  clearToasts: () => void
}

const DEFAULT_DURATION_MS = 5000

function createToastId(): string {
  return crypto.randomUUID()
}

export const useToastStore = create<ToastStore>((set, get) => ({
  toasts: [],

  showToast: (message, variant = 'info') => {
    const id = createToastId()
    set((state) => ({
      toasts: [...state.toasts, { id, message, variant }],
    }))

    window.setTimeout(() => {
      get().dismissToast(id)
    }, DEFAULT_DURATION_MS)
  },

  showError: (error) => {
    const message = typeof error === 'string' ? error : error.message
    get().showToast(message, 'error')
  },

  dismissToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }))
  },

  clearToasts: () => {
    set({ toasts: [] })
  },
}))
