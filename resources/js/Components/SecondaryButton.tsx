import React, { ButtonHTMLAttributes } from 'react'

interface SecondaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export default function SecondaryButton({ children, className = '', ...props }: SecondaryButtonProps) {
  return (
    <button
      {...props}
      className={`inline-flex items-center px-4 py-2 border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition ease-in-out duration-150 ${className}`}
    >
      {children}
    </button>
  )
}
