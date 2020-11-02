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
                'nombreR' => 'Semanal',
            ],
            [
                'nombreR' => 'Quincenal',
            ],
            [
                'nombreR' => 'Mensual',
            ],
            [
                'nombreR' => 'Semestral',
            ],
            [
                'nombreR' => 'Anual',
            ],
            [
                'nombreR' => 'Indefinido',
            ],
         ]);
    }
}
