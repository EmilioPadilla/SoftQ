<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class StatusDonacionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('status_donacion')->insert([
            [
                'nombre' => 'Aprobar',
            ],
            [
                'nombre' => 'Denegar',
            ],
          
         ]);
    }
}
