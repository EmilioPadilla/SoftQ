<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class SeederRecurrenciaD extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('_recurrencia')->insert([
            [
                'nombre' => 'Semanal',
            ],
            [
                'nombre' => 'Quincenal',
            ],
            [
                'nombre' => 'Mensual',
            ],
            [
                'nombre' => 'Semestral',
            ],
            [
                'nombre' => 'Anual',
            ]
        ]);
    }
}
