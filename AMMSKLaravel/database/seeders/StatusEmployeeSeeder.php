<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StatusEmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('status_emp')->insert([
            [
                'nombre' => 'Activos',
            ],
            [
                'nombre' => 'Inactivos',
            ],
         ]);
    }
}
