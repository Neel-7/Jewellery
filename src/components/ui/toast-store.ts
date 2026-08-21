import * as React from "react"
import type { ToastActionElement, ToastProps } from "@/components/ui/toast"

export interface ToasterToast extends ToastProps {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

let toasts: ToasterToast[] = []
const listeners = new Set<(toasts: ToasterToast[]) => void>()

export function subscribe(listener: (toasts: ToasterToast[]) => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function notify() {
  listeners.forEach((listener) => listener([...toasts]))
}

const TOAST_LIMIT = 5
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

export function dismissToast(id: string) {
  toasts = toasts.map((t) => (t.id === id ? { ...t, open: false } : t))
  notify()

  if (!toastTimeouts.has(id)) {
    const timeout = setTimeout(() => {
      toasts = toasts.filter((t) => t.id !== id)
      toastTimeouts.delete(id)
      notify()
    }, 1000) // delay to let exit animation run
    toastTimeouts.set(id, timeout)
  }
}

let count = 0
export function addToast(toastProps: Omit<ToasterToast, "id">) {
  const id = (count++).toString()
  const newToast: ToasterToast = {
    ...toastProps,
    id,
    open: true,
    onOpenChange: (open) => {
      if (!open) dismissToast(id)
    },
  }

  toasts = [newToast, ...toasts].slice(0, TOAST_LIMIT)
  notify()

  // auto dismiss after 5s
  setTimeout(() => {
    dismissToast(id)
  }, 5000)

  return id
}

export function getToasts() {
  return toasts
}
