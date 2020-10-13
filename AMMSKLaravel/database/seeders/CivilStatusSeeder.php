<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CivilStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      DB::table('civil_status')->insert([
          [
              'descripcion' => 'Casado',
          ],
          [
              'descripcion' => 'Divorciado',
          ],
          [
              'descripcion' => 'Soltero',
          ],
          [
              'descripcion' => 'Unión Libre',
          ],
          [
              'descripcion' => 'Separado',
          ],
          [
              'descripcion' => 'Viudo',
          ],
       ]);
    }
}
