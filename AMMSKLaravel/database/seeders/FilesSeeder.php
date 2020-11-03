<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FilesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('employee_files')->insert([
            [
                'employees_id' => '1',
                'nombre' => 'Acta_Nacimiento.pdf',
                'path' => 'src/files/employee/Acta_Nacimiento.pdf',
                'categoria' => 'personales',
                'comentarios' => 'Ninguno',
            ],
            [
                'employees_id' => '1',
                'nombre' => 'Contrato_Emilio.pdf',
                'path' => 'src/files/employee/Contrato_Emilio.pdf',
                'categoria' => 'personales',
                'comentarios' => 'Ninguno',
            ],
         ]);
    }
}
