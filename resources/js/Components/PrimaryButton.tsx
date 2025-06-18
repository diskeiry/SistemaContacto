import React from 'react'
import { ButtonHTMLAttributes } from 'react'

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export default function PrimaryButton({ children, className = '', ...props }: PrimaryButtonProps) {
  return (
    <button
      {...props}
      className={`inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ease-in-out duration-150 ${className}`}
    >
      {children}
    </button>
  )

}
