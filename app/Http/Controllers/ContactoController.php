<?php

namespace App\Http\Controllers;

use App\Models\Contacto;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

class ContactoController extends Controller
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
     * Muestra una lista de todos los contactos.
     */
    public function index()
    {
        $contactos = Contacto::all();

        return Inertia::render('Contactos/Index', [
            'contactos' => $contactos
        ]);
    }

    /**
     * Muestra el formulario para crear un nuevo contacto.
     */
    public function create()
    {
        return Inertia::render('Contactos/Create', [
            'provincias' => $this->provincias,
            'ciudadesPorProvincia' => $this->ciudadesPorProvincia
        ]);
    }

    /**
     * Almacena un nuevo contacto en la base de datos.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'apellido' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:contactos',
            'telefono' => 'required|string|max:20',
            'provincia' => 'required|string|max:255',
            'ciudad' => 'required|string|max:255',
            'direccion' => 'required|string|max:255',
        ]);

        Contacto::create($validated);

        return redirect()->route('contactos.index')
            ->with('message', 'Contacto creado exitosamente.');
    }

    /**
     * Muestra un contacto específico.
     */
    public function show(Contacto $contacto)
    {
        return Inertia::render('Contactos/Show', [
            'contacto' => $contacto
        ]);
    }

    /**
     * Muestra el formulario para editar un contacto específico.
     */
    public function edit(Contacto $contacto)
    {
        return Inertia::render('Contactos/Edit', [
            'contacto' => $contacto,
            'provincias' => $this->provincias,
            'ciudadesPorProvincia' => $this->ciudadesPorProvincia
        ]);
    }

    /**
     * Actualiza un contacto específico en la base de datos.
     */
    public function update(Request $request, Contacto $contacto)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'apellido' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:contactos,email,'.$contacto->id,
            'telefono' => 'required|string|max:20',
            'provincia' => 'required|string|max:255',
            'ciudad' => 'required|string|max:255',
            'direccion' => 'required|string|max:255',
        ]);

        $contacto->update($validated);

        return redirect()->route('contactos.index')
            ->with('message', 'Contacto actualizado exitosamente.');
    }

    /**
     * Elimina un contacto específico de la base de datos.
     */
    public function destroy(Contacto $contacto)
    {
        $contacto->delete();

        return redirect()->route('contactos.index')
            ->with('message', 'Contacto eliminado exitosamente.');
    }
}
