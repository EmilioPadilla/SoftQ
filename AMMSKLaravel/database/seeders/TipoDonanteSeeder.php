<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class TipoDonanteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tipo_donante')->insert([
            [
                'nombre' => 'Particular',
            ],
            [
                'nombre' => 'Patronato',
            ],
            [
                'nombre' => 'Gobierno',
            ],
            [
                'nombre' => 'Empresa',
            ],
            [
                'nombre' => 'Fundación',
            ],
         ]);
    }
}
