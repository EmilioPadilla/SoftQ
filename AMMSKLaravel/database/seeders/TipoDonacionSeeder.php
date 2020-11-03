<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class TipoDonacionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tipo_donacion')->insert([
            [
                'nombre' => 'Especie',
            ],
            [
                'nombre' => 'Monetaria',
            ],
            
         ]);
    }
}
