<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class VacationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('vacations')->insert([
            [
                'employees_id' => '1',
                'fechaSalida' => '2020-10-12',
                'fechaRegreso' => '2020-10-14',
            ],
            [
                'employees_id' => '1',
                'fechaSalida' => '2020-10-16',
                'fechaRegreso' => '2020-10-20',
            ],
         ]);
    }
}
