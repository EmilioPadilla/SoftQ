<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class RecurrenciaDonanteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('recurrencia')->insert([
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
            ],
            [
                'nombre' => 'Indefinido',
            ],
         ]);
    }
}
