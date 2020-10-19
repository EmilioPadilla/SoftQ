<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class SeederTipoDonante extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tipo_de_donante')->insert([
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
            ]
        ]);
    }
}
