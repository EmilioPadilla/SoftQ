<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ScholarshipSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      DB::table('scholarship')->insert([
          [
              'descripcion' => 'Sin estudios',
          ],
          [
              'descripcion' => 'Primaria',
          ],
          [
              'descripcion' => 'Secundaria',
          ],
          [
              'descripcion' => 'Preparatoria',
          ],
          [
              'descripcion' => 'Carrera técnica',
          ],
          [
              'descripcion' => 'Licenciatura',
          ],
          [
              'descripcion' => 'Maestría',
          ],
          [
              'descripcion' => 'Doctorado',
          ],
       ]);
    }
}
