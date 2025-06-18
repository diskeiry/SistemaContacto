import React, { ReactNode } from 'react'

interface ModalProps {
  show: boolean
  onClose: () => void
  children: ReactNode
}

export default function Modal({ show, onClose, children }: ModalProps) {
  if (!show) return null

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
