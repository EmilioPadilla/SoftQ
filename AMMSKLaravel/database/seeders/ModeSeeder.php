<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ModeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('modes')->insert([
            [
                'nombre' => 'pastilla(s)',
            ],
            [
                'nombre' => 'cápsula(s)',
            ],
           [
                'nombre' => 'ml',
            ],
           [
                'nombre' => 'gota(s)',
            ],
           [
                'nombre' => 'inyeccion(es)',
            ],
           [
                'nombre' => 'comprimido(s)',
            ],
           [
                'nombre' => 'atomizacion(es)',
            ],
           [
                'nombre' => 'chochito(s)',
            ],
           [
                'nombre' => 'gomita(s)',
            ],
           [
                'nombre' => 'tableta(s)',
            ]
         ]);
    }
}
