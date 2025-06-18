"use client"

import { useState, useEffect } from "react"
import { useForm, Head } from "@inertiajs/react"
import { route } from "ziggy-js" // Import route from ziggy-js
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Textarea } from "@/Components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"

export default function Create({ auth, provincias, ciudadesPorProvincia }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    provincia: "",
    ciudad: "",
    direccion: "",
  })

  const [ciudades, setCiudades] = useState([])

  // Actualizar ciudades cuando cambia la provincia
  useEffect(() => {
    if (data.provincia) {
      setCiudades(ciudadesPorProvincia[data.provincia] || [])
      // Resetear ciudad si la provincia cambia
      if (data.ciudad && !ciudadesPorProvincia[data.provincia]?.includes(data.ciudad)) {
        setData("ciudad", "")
      }
    } else {
      setCiudades([])
    }
  }, [data.provincia])

  const submit = (e) => {
    e.preventDefault()
    post(route("contactos.store"))
  }

  return (
    <AuthenticatedLayout>
      <Head title="Nuevo Contacto" />
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Nuevo Contacto</h1>

        <Card>
          <form onSubmit={submit}>
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
                    value={data.nombre}
                    onChange={(e) => setData("nombre", e.target.value)}
                    className={errors.nombre ? "border-red-500" : ""}
                  />
                  {errors.nombre && <p className="text-sm text-red-500">{errors.nombre}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apellido">Apellido</Label>
                  <Input
                    id="apellido"
                    name="apellido"
                    value={data.apellido}
                    onChange={(e) => setData("apellido", e.target.value)}
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
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input
                    id="telefono"
                    name="telefono"
                    value={data.telefono}
                    onChange={(e) => setData("telefono", e.target.value)}
                    className={errors.telefono ? "border-red-500" : ""}
                  />
                  {errors.telefono && <p className="text-sm text-red-500">{errors.telefono}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="provincia">Provincia</Label>
                  <Select value={data.provincia} onValueChange={(value) => setData("provincia", value)}>
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
                    value={data.ciudad}
                    onValueChange={(value) => setData("ciudad", value)}
                    disabled={!data.provincia || ciudades.length === 0}
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
                  value={data.direccion}
                  onChange={(e) => setData("direccion", e.target.value)}
                  className={errors.direccion ? "border-red-500" : ""}
                />
                {errors.direccion && <p className="text-sm text-red-500">{errors.direccion}</p>}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => window.history.back()}>
                Cancelar
              </Button>
              <Button type="submit" disabled={processing}>
                {processing ? "Guardando..." : "Guardar Contacto"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </AuthenticatedLayout>
  )
}
