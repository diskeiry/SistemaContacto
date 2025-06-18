import React from 'react'
import { ButtonHTMLAttributes } from 'react'

interface DangerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export default function DangerButton({ children, className = '', ...props }: DangerButtonProps) {
  return (
    <button
      {...props}
      className={`inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition ease-in-out duration-150 ${className}`}
    >
      {children}
    </button>
  )
}
