import React from 'react'
import { LabelHTMLAttributes } from 'react'

interface InputLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  value?: string
  children?: React.ReactNode
}

export default function InputLabel({ value, children, className = '', ...props }: InputLabelProps) {
  return (
    <label
      {...props}
      className={`block font-medium text-sm text-gray-700 ${className}`}
    >
      {value ? value : children}
    </label>
  )
}
