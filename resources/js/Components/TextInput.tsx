import React, { useEffect, useRef, forwardRef, InputHTMLAttributes } from 'react'

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  isFocused?: boolean
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({ isFocused = false, className = '', ...props }, ref) => {
  const internalRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isFocused) {
      if (ref && typeof ref !== 'function' && 'current' in ref && ref.current) {
        ref.current.focus()
      } else if (internalRef.current) {
        internalRef.current.focus()
      }
    }
  }, [isFocused, ref])

  // Usamos el ref que venga o el interno para el foco
  return <input {...props} ref={ref || internalRef} className={`border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ${className}`} />
})

TextInput.displayName = 'TextInput'

export default TextInput
