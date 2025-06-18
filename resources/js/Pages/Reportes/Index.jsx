"use client"

import { useState, useEffect } from "react"
import { Head } from "@inertiajs/react"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table"
import { Download, FileText } from "lucide-react"

export default function ReportesIndex({ auth, contactos, provincias, ciudadesPorProvincia }) {
  const [filters, setFilters] = useState({
    fechaDesde: "",
    fechaHasta: "",
    nombre: "",
    provincia: "all", // Updated default value
    ciudad: "all", // Updated default value
  })

  const [ciudades, setCiudades] = useState([])
  const [filteredContactos, setFilteredContactos] = useState(contactos)

  // Manejar cambio de provincia
  const handleProvinciaChange = (provincia) => {
    setFilters((prev) => ({
      ...prev,
      provincia,
      ciudad: "", // Resetear ciudad al cambiar provincia
    }))

    setCiudades(ciudadesPorProvincia[provincia] || [])
  }

  // Actualizar los contactos filtrados cuando cambien los filtros
  useEffect(() => {
    const filtered = contactos.filter((contacto) => {
      // Filtrar por fecha desde
      if (filters.fechaDesde && new Date(contacto.created_at) < new Date(filters.fechaDesde)) {
        return false
      }

      // Filtrar por fecha hasta
      if (filters.fechaHasta) {
        const fechaHasta = new Date(filters.fechaHasta)
        fechaHasta.setHours(23, 59, 59) // Establecer al final del día
        if (new Date(contacto.created_at) > fechaHasta) {
          return false
        }
      }

      // Filtrar por nombre
      if (
        filters.nombre &&
        !`${contacto.nombre} ${contacto.apellido}`.toLowerCase().includes(filters.nombre.toLowerCase())
      ) {
        return false
      }

      // Filtrar por provincia
      if (filters.provincia !== "all" && contacto.provincia !== filters.provincia) {
        return false
      }

      // Filtrar por ciudad
      if (filters.ciudad !== "all" && contacto.ciudad !== filters.ciudad) {
        return false
      }

      return true
    })

    setFilteredContactos(filtered)
  }, [filters, contactos])

  // Generar CSV
  const generateCSV = () => {
    // Cabeceras del CSV
    const headers = [
      "ID",
      "Nombre",
      "Apellido",
      "Email",
      "Teléfono",
      "Provincia",
      "Ciudad",
      "Dirección",
      "Fecha de Creación",
    ]

    // Convertir datos a filas CSV
    const rows = filteredContactos.map((contacto) => [
      contacto.id,
      contacto.nombre,
      contacto.apellido,
      contacto.email,
      contacto.telefono,
      contacto.provincia,
      contacto.ciudad,
      contacto.direccion,
      new Date(contacto.created_at).toLocaleDateString(),
    ])

    // Combinar cabeceras y filas
    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n")

    // Crear blob y descargar
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `reporte-contactos-${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <AuthenticatedLayout>
      <Head title="Reportes" />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Reportes de Contactos</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
            <CardDescription>Aplica filtros para generar un reporte personalizado</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fechaDesde">Fecha Desde</Label>
                <Input
                  id="fechaDesde"
                  type="date"
                  value={filters.fechaDesde}
                  onChange={(e) => setFilters((prev) => ({ ...prev, fechaDesde: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fechaHasta">Fecha Hasta</Label>
                <Input
                  id="fechaHasta"
                  type="date"
                  value={filters.fechaHasta}
                  onChange={(e) => setFilters((prev) => ({ ...prev, fechaHasta: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre</Label>
                <Input
                  id="nombre"
                  placeholder="Buscar por nombre..."
                  value={filters.nombre}
                  onChange={(e) => setFilters((prev) => ({ ...prev, nombre: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="provincia">Provincia</Label>
                <Select value={filters.provincia} onValueChange={handleProvinciaChange}>
                  <SelectTrigger id="provincia">
                    <SelectValue placeholder="Todas las provincias" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las provincias</SelectItem>
                    {provincias.map((provincia) => (
                      <SelectItem key={provincia} value={provincia}>
                        {provincia}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ciudad">Ciudad</Label>
                <Select
                  value={filters.ciudad}
                  onValueChange={(ciudad) => setFilters((prev) => ({ ...prev, ciudad }))}
                  disabled={!filters.provincia || filters.provincia === "all"}
                >
                  <SelectTrigger id="ciudad">
                    <SelectValue placeholder="Todas las ciudades" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las ciudades</SelectItem>
                    {ciudades.map((ciudad) => (
                      <SelectItem key={ciudad} value={ciudad}>
                        {ciudad}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Resultados ({filteredContactos.length})</h2>
          <Button onClick={generateCSV} disabled={filteredContactos.length === 0}>
            <Download className="mr-2 h-4 w-4" />
            Descargar CSV
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Apellido</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead className="hidden md:table-cell">Provincia</TableHead>
                <TableHead className="hidden md:table-cell">Ciudad</TableHead>
                <TableHead>Fecha</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContactos.length > 0 ? (
                filteredContactos.map((contacto) => (
                  <TableRow key={contacto.id}>
                    <TableCell>{contacto.nombre}</TableCell>
                    <TableCell>{contacto.apellido}</TableCell>
                    <TableCell className="hidden md:table-cell">{contacto.email}</TableCell>
                    <TableCell className="hidden md:table-cell">{contacto.provincia}</TableCell>
                    <TableCell className="hidden md:table-cell">{contacto.ciudad}</TableCell>
                    <TableCell>{new Date(contacto.created_at).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6">
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <FileText className="h-10 w-10 mb-2" />
                      <p>No se encontraron resultados con los filtros aplicados</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
