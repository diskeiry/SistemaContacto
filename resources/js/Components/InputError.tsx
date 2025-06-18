import React from 'react'

interface InputErrorProps {
  message?: string | string[]
  className?: string
}

export default function InputError({ message, className = '' }: InputErrorProps) {
  if (!message) return null

  return (
    <p className={`text-sm text-red-600 mt-2 ${className}`}>
      {Array.isArray(message) ? message.join(', ') : message}
    </p>
  )
}
