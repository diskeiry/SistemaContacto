"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import MainLayout from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { provincias, ciudadesPorProvincia } from "@/lib/data"

export default function NuevoContactoPage() {
  const router = useRouter()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    provincia: "",
    ciudad: "",
    direccion: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [ciudades, setCiudades] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Actualizar ciudades cuando cambia la provincia
  useEffect(() => {
    if (formData.provincia) {
      setCiudades(ciudadesPorProvincia[formData.provincia] || [])
      // Resetear ciudad si la provincia cambia
      if (formData.ciudad && !ciudadesPorProvincia[formData.provincia]?.includes(formData.ciudad)) {
        setFormData((prev) => ({ ...prev, ciudad: "" }))
      }
    } else {
      setCiudades([])
    }
  }, [formData.provincia])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Limpiar error al cambiar el valor
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Limpiar error al cambiar el valor
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio"
    }

    if (!formData.apellido.trim()) {
      newErrors.apellido = "El apellido es obligatorio"
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "El formato del email no es válido"
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = "El teléfono es obligatorio"
    }

    if (!formData.provincia) {
      newErrors.provincia = "La provincia es obligatoria"
    }

    if (!formData.ciudad) {
      newErrors.ciudad = "La ciudad es obligatoria"
    }

    if (!formData.direccion.trim()) {
      newErrors.direccion = "La dirección es obligatoria"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulación de envío a API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Contacto creado",
        description: "El contacto ha sido creado exitosamente.",
      })

      router.push("/contactos")
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error al crear el contacto.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Nuevo Contacto</h1>

        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Información del Contacto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre</Label>
                  <Input
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className={errors.nombre ? "border-red-500" : ""}
                  />
                  {errors.nombre && <p className="text-sm text-red-500">{errors.nombre}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apellido">Apellido</Label>
                  <Input
                    id="apellido"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    className={errors.apellido ? "border-red-500" : ""}
                  />
                  {errors.apellido && <p className="text-sm text-red-500">{errors.apellido}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className={errors.telefono ? "border-red-500" : ""}
                  />
                  {errors.telefono && <p className="text-sm text-red-500">{errors.telefono}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="provincia">Provincia</Label>
                  <Select value={formData.provincia} onValueChange={(value) => handleSelectChange("provincia", value)}>
                    <SelectTrigger id="provincia" className={errors.provincia ? "border-red-500" : ""}>
                      <SelectValue placeholder="Seleccionar provincia" />
                    </SelectTrigger>
                    <SelectContent>
                      {provincias.map((provincia) => (
                        <SelectItem key={provincia} value={provincia}>
                          {provincia}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.provincia && <p className="text-sm text-red-500">{errors.provincia}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ciudad">Ciudad</Label>
                  <Select
                    value={formData.ciudad}
                    onValueChange={(value) => handleSelectChange("ciudad", value)}
                    disabled={!formData.provincia || ciudades.length === 0}
                  >
                    <SelectTrigger id="ciudad" className={errors.ciudad ? "border-red-500" : ""}>
                      <SelectValue placeholder="Seleccionar ciudad" />
                    </SelectTrigger>
                    <SelectContent>
                      {ciudades.map((ciudad) => (
                        <SelectItem key={ciudad} value={ciudad}>
                          {ciudad}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.ciudad && <p className="text-sm text-red-500">{errors.ciudad}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="direccion">Dirección</Label>
                <Textarea
                  id="direccion"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  className={errors.direccion ? "border-red-500" : ""}
                />
                {errors.direccion && <p className="text-sm text-red-500">{errors.direccion}</p>}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => router.push("/contactos")}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Guardando..." : "Guardar Contacto"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </MainLayout>
  )
}
