"use client"

import { useEffect } from "react"
import { useForm, Head } from "@inertiajs/react"
import { route } from "ziggy-js" // Import route from ziggy-js
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"
import GuestLayout from "@/Layouts/GuestLayout"

export default function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: false,
  })

  useEffect(() => {
    return () => {
      reset("password")
    }
  }, [])

  const submit = (e) => {
    e.preventDefault()
    post(route("login"))
  }

  return (
    <GuestLayout>
      <Head title="Iniciar Sesión" />

      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Iniciar Sesión</CardTitle>
          <CardDescription className="text-center">Ingrese sus credenciales para acceder al sistema</CardDescription>
        </CardHeader>

        {status && <div className="mb-4 font-medium text-sm text-green-600 px-6">{status}</div>}

        <form onSubmit={submit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={data.email}
                autoComplete="username"
                placeholder="correo@ejemplo.com"
                onChange={(e) => setData("email", e.target.value)}
                className={errors.email ? "border-red-500" : ""}
                required
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Contraseña</Label>
                {canResetPassword && (
                  <a href={route("password.request")} className="text-sm text-blue-600 hover:text-blue-500">
                    ¿Olvidó su contraseña?
                  </a>
                )}
              </div>
              <Input
                id="password"
                type="password"
                name="password"
                value={data.password}
                autoComplete="current-password"
                onChange={(e) => setData("password", e.target.value)}
                className={errors.password ? "border-red-500" : ""}
                required
              />
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div>

            <div className="flex items-center space-x-2">
              <input
                id="remember"
                type="checkbox"
                name="remember"
                checked={data.remember}
                onChange={(e) => setData("remember", e.target.checked)}
                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
              />
              <Label htmlFor="remember" className="text-sm">
                Recordarme
              </Label>
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full" disabled={processing}>
              {processing ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </GuestLayout>
  )
}
