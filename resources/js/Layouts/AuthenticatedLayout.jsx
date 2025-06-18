"use client"

import { useState } from "react"
import { Link, usePage } from "@inertiajs/react"
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet"
import { Button } from "@/Components/ui/button"
import { Menu, User, FileText, LogOut, Home } from "lucide-react"
import { route } from "ziggy-js" // Import route from ziggy-js

export default function AuthenticatedLayout({ children, user, header }) {
  const { auth } = usePage().props
  const [open, setOpen] = useState(false)

  const navigation = [
    { name: "Dashboard", href: route("dashboard"), icon: Home },
    { name: "Contactos", href: route("contactos.index"), icon: User },
    { name: "Reportes", href: route("reportes.index"), icon: FileText },
  ]

  const pathname = usePage().url

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar para desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-grow pt-5 bg-white overflow-y-auto border-r">
          <div className="flex items-center px-4 mb-5">
            <h1 className="text-xl font-semibold">Sistema de Contactos</h1>
            {user && (
              <span className="ml-2 text-sm text-gray-500">Bienvenido, {user.name}</span>
            )}
          </div>
          <div className="mt-5 flex-1 flex flex-col">
            <nav className="flex-1 px-2 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                  >
                    <item.icon
                      className={`mr-3 flex-shrink-0 h-5 w-5 ${isActive ? "text-gray-500" : "text-gray-400 group-hover:text-gray-500"
                        }`}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <Link
              href={route("logout")}
              method="post"
              as="button"
              className="flex items-center text-gray-600 hover:text-gray-900 w-full justify-start"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Cerrar sesión
            </Link>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="md:pl-64 flex flex-col flex-1">
        {/* Barra superior móvil */}
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="px-4">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[240px]">
              <div className="flex flex-col h-full">
                <div className="px-4 py-6 border-b">
                  <h2 className="text-lg font-semibold">Sistema de Contactos</h2>
                </div>
                <nav className="flex-1 px-2 py-4 space-y-1">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          }`}
                        onClick={() => setOpen(false)}
                      >
                        <item.icon
                          className={`mr-3 flex-shrink-0 h-5 w-5 ${isActive ? "text-gray-500" : "text-gray-400 group-hover:text-gray-500"
                            }`}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    )
                  })}
                </nav>
                <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                  <Link
                    href={route("logout")}
                    method="post"
                    as="button"
                    className="flex items-center text-gray-600 hover:text-gray-900 w-full justify-start"
                    onClick={() => setOpen(false)}
                  >
                    <LogOut className="mr-3 h-5 w-5" />
                    Cerrar sesión
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <div className="flex-1 flex justify-center px-4">
            <div className="flex-1 flex items-center justify-center">
              <h1 className="text-lg font-semibold">Sistema de Contactos</h1>
            </div>
          </div>
        </div>

        {/* Contenido de la página */}
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {header && <div className="mb-4">{header}</div>}
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
