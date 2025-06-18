<?php

namespace Database\Seeders;

use App\Models\Contacto;
use Illuminate\Database\Seeder;

class ContactoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $contactos = [
            [
                'nombre' => 'Juan',
                'apellido' => 'Pérez',
                'email' => 'juan.perez@ejemplo.com',
                'telefono' => '11-1234-5678',
                'provincia' => 'Buenos Aires',
                'ciudad' => 'La Plata',
                'direccion' => 'Calle 7 123',
                'created_at' => '2023-01-15 10:30:00',
            ],
            [
                'nombre' => 'María',
                'apellido' => 'González',
                'email' => 'maria.gonzalez@ejemplo.com',
                'telefono' => '351-987-6543',
                'provincia' => 'Córdoba',
                'ciudad' => 'Córdoba',
                'direccion' => 'Av. Colón 456',
                'created_at' => '2023-02-20 14:45:00',
            ],
            [
                'nombre' => 'Carlos',
                'apellido' => 'Rodríguez',
                'email' => 'carlos.rodriguez@ejemplo.com',
                'telefono' => '341-555-7890',
                'provincia' => 'Santa Fe',
                'ciudad' => 'Rosario',
                'direccion' => 'Pellegrini 789',
                'created_at' => '2023-03-10 09:15:00',
            ],
            [
                'nombre' => 'Laura',
                'apellido' => 'Fernández',
                'email' => 'laura.fernandez@ejemplo.com',
                'telefono' => '261-444-3210',
                'provincia' => 'Mendoza',
                'ciudad' => 'Mendoza',
                'direccion' => 'San Martín 234',
                'created_at' => '2023-04-05 16:20:00',
            ],
            [
                'nombre' => 'Roberto',
                'apellido' => 'López',
                'email' => 'roberto.lopez@ejemplo.com',
                'telefono' => '11-9876-5432',
                'provincia' => 'Buenos Aires',
                'ciudad' => 'Mar del Plata',
                'direccion' => 'Av. Luro 567',
                'created_at' => '2023-05-12 11:10:00',
            ],
            [
                'nombre' => 'Ana',
                'apellido' => 'Martínez',
                'email' => 'ana.martinez@ejemplo.com',
                'telefono' => '351-222-3333',
                'provincia' => 'Córdoba',
                'ciudad' => 'Villa María',
                'direccion' => 'Belgrano 890',
                'created_at' => '2023-06-18 13:40:00',
            ],
            [
                'nombre' => 'Diego',
                'apellido' => 'Sánchez',
                'email' => 'diego.sanchez@ejemplo.com',
                'telefono' => '341-111-2222',
                'provincia' => 'Santa Fe',
                'ciudad' => 'Santa Fe',
                'direccion' => 'Rivadavia 123',
                'created_at' => '2023-07-22 10:05:00',
            ],
            [
                'nombre' => 'Lucía',
                'apellido' => 'Díaz',
                'email' => 'lucia.diaz@ejemplo.com',
                'telefono' => '261-333-4444',
                'provincia' => 'Mendoza',
                'ciudad' => 'San Rafael',
                'direccion' => 'Mitre 456',
                'created_at' => '2023-08-30 15:25:00',
            ],
            [
                'nombre' => 'Miguel',
                'apellido' => 'Torres',
                'email' => 'miguel.torres@ejemplo.com',
                'telefono' => '11-5555-6666',
                'provincia' => 'Buenos Aires',
                'ciudad' => 'Tandil',
                'direccion' => 'Pinto 789',
                'created_at' => '2023-09-14 09:50:00',
            ],
            [
                'nombre' => 'Silvia',
                'apellido' => 'Romero',
                'email' => 'silvia.romero@ejemplo.com',
                'telefono' => '351-777-8888',
                'provincia' => 'Córdoba',
                'ciudad' => 'Río Cuarto',
                'direccion' => 'San Martín 234',
                'created_at' => '2023-10-25 14:15:00',
            ],
        ];

        foreach ($contactos as $contacto) {
            Contacto::create($contacto);
        }
    }
}
