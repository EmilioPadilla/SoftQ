<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KinshipSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      DB::table('kinship')->insert([
          [
              'descripcion' => 'Hija/o',
          ],
          [
              'descripcion' => 'Hermana/o',
          ],
          [
              'descripcion' => 'Padre',
          ],
          [
              'descripcion' => 'Madre',
          ],
          [
              'descripcion' => 'Prima/o',
          ],
          [
              'descripcion' => 'Compadre',
          ],
          [
              'descripcion' => 'Comadre',
          ],
          [
              'descripcion' => 'Amiga/o',
          ],
          [
              'descripcion' => 'Cuñada/o',
          ],
       ]);
    }
}
