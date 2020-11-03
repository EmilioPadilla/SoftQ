<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JobTitleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('job_title')->insert([
            [
                'nombre' => 'Enfermera',
            ],
            [
                'nombre' => 'Director(a)',
            ],
            [
                'nombre' => 'Servicios generales',
            ],
            [
                'nombre' => 'Lavanderia',
            ],
            [
                'nombre' => 'Mayordomo',
            ],
            [
                'nombre' => 'Hermana',
            ],
            [
                'nombre' => 'Dirección administrativa',
            ],
         ]);
    }
}
