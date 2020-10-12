<?php


namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Roles_PrivilegesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles_privileges')->insert([
            [
                'idRol' => '1',
                'idPrivilege' => '1'
            ],
            [
                'idRol' => '2',
                'idPrivilege' => '1'
            ],
            [
                'idRol' => '2',
                'idPrivilege' => '3'
            ],
            [
                'idRol' => '3',
                'idPrivilege' => '3'
            ],
            [
                'idRol' => '3',
                'idPrivilege' => '2'
            ],
            [
                'idRol' => '3',
                'idPrivilege' => '4'
            ],
         ]);
    }
}
