<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ShiftsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      DB::table('shifts')->insert([
          [
            'nombre' => 'Matutino',
            'horaIngreso' => '7:00',
            'horaSalida' => '15:00',
          ],
          [
            'nombre' => 'Vespertino',
            'horaIngreso' => '15:00',
            'horaSalida' => '23:00',
          ],
          [
            'nombre' => 'Nocturno',
            'horaIngreso' => '23:00',
            'horaSalida' => '7:00',
          ],
       ]);
    }
}
