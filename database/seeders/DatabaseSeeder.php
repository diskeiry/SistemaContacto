<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Crear un usuario administrador
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'user@gmail.com',
            'password' => bcrypt('123'),
        ]);

        // Crear usuarios adicionales
        User::factory(5)->create();

        // Ejecutar el seeder de contactos
        $this->call([
            ContactoSeeder::class,
        ]);
    }
}
