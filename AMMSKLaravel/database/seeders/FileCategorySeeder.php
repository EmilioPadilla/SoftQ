<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FileCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('file_category')->insert([
            [
                'name' => 'Ingreso',
            ],
            [
                'name' => 'Egreso',
            ],
            [
                'name' => 'Religioso',
            ],
            [
                'name' => 'Escolar',
            ],
            [
                'name' => 'Salud',
            ],
            [
                'name' => 'Imagen de ingreso',
            ],
            [
                'name' => 'Imagen de egreso',
            ],
         ]);
    }
}
