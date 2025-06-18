<?php

namespace App\Http\Controllers;

use App\Models\Contacto;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReporteController extends Controller
{
    /**
     * Lista de provincias disponibles.
     */
    private $provincias = [
        "Buenos Aires",
        "Ciudad Autónoma de Buenos Aires",
        "Catamarca",
        "Chaco",
        "Chubut",
        "Córdoba",
        "Corrientes",
        "Entre Ríos",
        "Formosa",
        "Jujuy",
        "La Pampa",
        "La Rioja",
        "Mendoza",
        "Misiones",
        "Neuquén",
        "Río Negro",
        "Salta",
        "San Juan",
        "San Luis",
        "Santa Cruz",
        "Santa Fe",
        "Santiago del Estero",
        "Tierra del Fuego",
        "Tucumán",
    ];

    /**
     * Ciudades disponibles por provincia.
     */
    private $ciudadesPorProvincia = [
        "Buenos Aires" => ["La Plata", "Mar del Plata", "Bahía Blanca", "Quilmes", "Tandil"],
        "Ciudad Autónoma de Buenos Aires" => ["Buenos Aires"],
        "Córdoba" => ["Córdoba", "Villa María", "Río Cuarto", "Carlos Paz"],
        "Santa Fe" => ["Rosario", "Santa Fe", "Rafaela", "Venado Tuerto"],
        "Mendoza" => ["Mendoza", "San Rafael", "Godoy Cruz", "Maipú"],
        // Añadir más ciudades según sea necesario
    ];

    /**
     * Muestra la página de reportes.
     */
    public function index()
    {
        $contactos = Contacto::all();

        return Inertia::render('Reportes/Index', [
            'contactos' => $contactos,
            'provincias' => $this->provincias,
            'ciudadesPorProvincia' => $this->ciudadesPorProvincia
        ]);
    }

    /**
     * Genera y descarga un reporte en formato CSV.
     */
    public function exportarCsv(Request $request)
    {
        // Obtener los filtros
        $fechaDesde = $request->input('fecha_desde');
        $fechaHasta = $request->input('fecha_hasta');
        $nombre = $request->input('nombre');
        $provincia = $request->input('provincia');
        $ciudad = $request->input('ciudad');

        // Construir la consulta
        $query = Contacto::query();

        if ($fechaDesde) {
            $query->whereDate('created_at', '>=', $fechaDesde);
        }

        if ($fechaHasta) {
            $query->whereDate('created_at', '<=', $fechaHasta);
        }

        if ($nombre) {
            $query->where(function($q) use ($nombre) {
                $q->where('nombre', 'like', "%{$nombre}%")
                  ->orWhere('apellido', 'like', "%{$nombre}%");
            });
        }

        if ($provincia) {
            $query->where('provincia', $provincia);
        }

        if ($ciudad) {
            $query->where('ciudad', $ciudad);
        }

        // Obtener los resultados
        $contactos = $query->get();

        // Generar CSV
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename=reporte_contactos_' . date('Y-m-d') . '.csv',
            'Pragma' => 'no-cache',
            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
            'Expires' => '0'
        ];

        $callback = function() use ($contactos) {
            $file = fopen('php://output', 'w');
            fputcsv($file, ['ID', 'Nombre', 'Apellido', 'Email', 'Teléfono', 'Provincia', 'Ciudad', 'Dirección', 'Fecha de Creación']);

            foreach ($contactos as $contacto) {
                fputcsv($file, [
                    $contacto->id,
                    $contacto->nombre,
                    $contacto->apellido,
                    $contacto->email,
                    $contacto->telefono,
                    $contacto->provincia,
                    $contacto->ciudad,
                    $contacto->direccion,
                    $contacto->created_at->format('d/m/Y')
                ]);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}
