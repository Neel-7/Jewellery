import * as React from "react"
import { addToast, dismissToast, subscribe, getToasts, type ToasterToast } from "./toast-store"

type Toast = Omit<ToasterToast, "id">

export function toast(props: Toast) {
  const id = addToast(props)
  return {
    id,
    dismiss: () => dismissToast(id),
  }
}

export function useToast() {
  const [toasts, setToasts] = React.useState<ToasterToast[]>(getToasts())

  React.useEffect(() => {
    return subscribe(setToasts)
  }, [])

  return {
    toasts,
    toast,
    dismiss: dismissToast,
  }
}
