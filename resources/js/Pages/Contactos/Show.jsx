import { Head, Link } from "@inertiajs/react"
import {route} from "ziggy-js"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"
import { ArrowLeft, Edit, Trash2 } from "lucide-react"

export default function Show({ auth, contacto }) {
  return (
    <AuthenticatedLayout>
      <Head title={`${contacto.nombre} ${contacto.apellido}`} />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Detalles del Contacto</h1>
          <div className="flex space-x-2">
            <Link href={route("contactos.edit", contacto.id)}>
              <Button variant="outline" size="sm">
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </Button>
            </Link>
            <Link href={route("contactos.destroy", contacto.id)} method="delete" as="button">
              <Button variant="destructive" size="sm">
                <Trash2 className="mr-2 h-4 w-4" />
                Eliminar
              </Button>
            </Link>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {contacto.nombre} {contacto.apellido}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                <p>{contacto.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Teléfono</h3>
                <p>{contacto.telefono}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Provincia</h3>
                <p>{contacto.provincia}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Ciudad</h3>
                <p>{contacto.ciudad}</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Dirección</h3>
              <p>{contacto.direccion}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Fecha de Creación</h3>
              <p>{new Date(contacto.created_at).toLocaleDateString()}</p>
            </div>
          </CardContent>
          <CardFooter>
            <Link href={route("contactos.index")}>
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver a la lista
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </AuthenticatedLayout>
  )
}
