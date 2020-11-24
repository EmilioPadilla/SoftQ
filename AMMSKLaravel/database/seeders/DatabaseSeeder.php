<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        $this->call(CivilStatusSeeder::class);
        $this->call(HeadquarterSeeder::class);
        $this->call(KinshipSeeder::class);
        $this->call(ModeSeeder::class);
        $this->call(PrivilegesSeeder::class);
        $this->call(RolesSeeder::class);
        $this->call(Roles_PrivilegesSeeder::class);
        $this->call(ScholarshipSeeder::class);
        // $this->call(SeederRecurrenciaD::class);
        // $this->call(SeederTipoDonante::class);
        $this->call(SpecialtySeeder::class);
        $this->call(StatusSeeder::class);
        $this->call(ShiftsSeeder::class);
        $this->call(CategorySeeder::class);
        $this->call(StatusEmployeeSeeder::class);
        $this->call(JobTitleSeeder::class);
        $this->call(EmployeeSeeder::class);
        $this->call(StatesSeeder::class);
        //$this->call(FilesSeeder::class);
        
    }
}
