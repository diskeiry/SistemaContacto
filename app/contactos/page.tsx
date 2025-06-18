"use client"

import { useState } from "react"
import Link from "next/link"
import MainLayout from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { contactosData, type Contacto } from "@/lib/data"
import { Plus, Search } from "lucide-react"

export default function ContactosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState<keyof Contacto | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const itemsPerPage = 5

  // Filtrar contactos por término de búsqueda
  const filteredContactos = contactosData.filter(
    (contacto) =>
      contacto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contacto.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contacto.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contacto.provincia.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contacto.ciudad.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Ordenar contactos
  const sortedContactos = [...filteredContactos].sort((a, b) => {
    if (!sortField) return 0

    const aValue = a[sortField]
    const bValue = b[sortField]

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    return 0
  })

  // Paginar contactos
  const totalPages = Math.ceil(sortedContactos.length / itemsPerPage)
  const paginatedContactos = sortedContactos.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Manejar ordenamiento
  const handleSort = (field: keyof Contacto) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Renderizar indicador de ordenamiento
  const renderSortIndicator = (field: keyof Contacto) => {
    if (sortField !== field) return null
    return sortDirection === "asc" ? " ↑" : " ↓"
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <h1 className="text-2xl font-bold tracking-tight">Gestión de Contactos</h1>
          <Link href="/contactos/nuevo">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Contacto
            </Button>
          </Link>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar contactos..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1) // Reset to first page on search
              }}
            />
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="cursor-pointer" onClick={() => handleSort("nombre")}>
                  Nombre{renderSortIndicator("nombre")}
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("apellido")}>
                  Apellido{renderSortIndicator("apellido")}
                </TableHead>
                <TableHead className="hidden md:table-cell cursor-pointer" onClick={() => handleSort("email")}>
                  Email{renderSortIndicator("email")}
                </TableHead>
                <TableHead className="hidden md:table-cell cursor-pointer" onClick={() => handleSort("provincia")}>
                  Provincia{renderSortIndicator("provincia")}
                </TableHead>
                <TableHead className="hidden md:table-cell cursor-pointer" onClick={() => handleSort("ciudad")}>
                  Ciudad{renderSortIndicator("ciudad")}
                </TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedContactos.length > 0 ? (
                paginatedContactos.map((contacto) => (
                  <TableRow key={contacto.id}>
                    <TableCell>{contacto.nombre}</TableCell>
                    <TableCell>{contacto.apellido}</TableCell>
                    <TableCell className="hidden md:table-cell">{contacto.email}</TableCell>
                    <TableCell className="hidden md:table-cell">{contacto.provincia}</TableCell>
                    <TableCell className="hidden md:table-cell">{contacto.ciudad}</TableCell>
                    <TableCell className="text-right">
                      <Link href={`/contactos/${contacto.id}`}>
                        <Button variant="ghost" size="sm">
                          Ver
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6">
                    No se encontraron contactos
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage > 1) setCurrentPage(currentPage - 1)
                  }}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                // Mostrar páginas alrededor de la página actual
                let pageNum
                if (totalPages <= 5) {
                  pageNum = i + 1
                } else if (currentPage <= 3) {
                  pageNum = i + 1
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i
                } else {
                  pageNum = currentPage - 2 + i
                }

                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        setCurrentPage(pageNum)
                      }}
                      isActive={currentPage === pageNum}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                )
              })}

              {totalPages > 5 && currentPage < totalPages - 2 && (
                <>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        setCurrentPage(totalPages)
                      }}
                    >
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                  }}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </MainLayout>
  )
}
