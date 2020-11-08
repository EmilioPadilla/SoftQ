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
                'nombre' => 'Empleado General',
            ],
            [
                'nombre' => 'Administrador(a)',
            ],
            [
                'nombre' => 'Enfermera(o)',
            ],
            [
                'nombre' => 'Chofer',
            ],
            [
                'nombre' => 'Voluntario',
            ],
         ]);
    }
}
