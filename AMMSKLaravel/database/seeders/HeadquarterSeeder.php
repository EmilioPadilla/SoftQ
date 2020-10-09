<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class HeadquarterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('headquarters')->insert([
            [
                'nombre' => 'Asoc. MMK',
            ],
            [
                'nombre' => 'Granja Betanía',
            ],
         ]);
    }
}
