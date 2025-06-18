"use client"

import { useState, useEffect } from "react"

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 5000

let count = 0

function generateId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

export const useToast = () => {
  const [toasts, setToasts] = useState([])

  const dismiss = (toastId) => {
    setToasts((toasts) => toasts.filter((t) => t.id !== toastId))
  }

  const toast = ({ ...props }) => {
    const id = props.id || generateId()
    const newToast = { id, ...props }

    setToasts((prevToasts) => {
      const existingToast = prevToasts.find((toast) => toast.id === id)

      if (existingToast) {
        return prevToasts.map((t) => (t.id === id ? { ...t, ...newToast } : t))
      }

      return [newToast, ...prevToasts].slice(0, TOAST_LIMIT)
    })

    return {
      id,
      dismiss: () => dismiss(id),
    }
  }

  useEffect(() => {
    const timeouts = []

    toasts.forEach((toast) => {
      if (toast.duration !== Number.POSITIVE_INFINITY) {
        const timeout = setTimeout(() => {
          dismiss(toast.id)
        }, toast.duration || TOAST_REMOVE_DELAY)

        timeouts.push(timeout)
      }
    })

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout))
    }
  }, [toasts])

  return {
    toasts,
    toast,
    dismiss,
  }
}
