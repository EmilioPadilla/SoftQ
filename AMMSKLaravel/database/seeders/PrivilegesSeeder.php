<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PrivilegesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('privileges')->insert([
            [
                'nombrePrivilegio' => 'Ver nómina',
            ],
            [
                'nombrePrivilegio' => 'Crud empleado',
            ],
            [
                'nombrePrivilegio' => 'Crud beneficiaria',
            ],
            [
                'nombrePrivilegio' => 'Crud donaciones',
            ],
         ]);
    }
}
