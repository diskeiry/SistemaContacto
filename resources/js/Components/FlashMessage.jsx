"use client"

import { useEffect } from "react"
import { usePage } from "@inertiajs/react"
import { useToast } from "@/hooks/use-toast"

export default function FlashMessage() {
  const { flash } = usePage().props
  const { toast } = useToast()

  useEffect(() => {
    if (flash.message) {
      toast({
        title: "Notificación",
        description: flash.message,
        duration: 5000,
      })
    }

    if (flash.error) {
      toast({
        title: "Error",
        description: flash.error,
        variant: "destructive",
        duration: 5000,
      })
    }
  }, [flash])

  return null
}
