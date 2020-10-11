<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SpecialtySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('specialties')->insert([
            [
                'nombre' => 'Anatomía patológica',
            ],
            [
                'nombre' => 'Alergología',
            ],
            [
                'nombre' => 'Cardiología',
            ],
           [
                'nombre' => 'Cirugía pediátrica',
            ],
            [
                'nombre' => 'Cirugía cardíaca',
            ],
           [
                'nombre' => 'Cirugía general',
            ],
           [
                'nombre' => 'Cirugía vascular',
            ],
           [
                'nombre' => 'Dermatología',
            ],
           [
                'nombre' => 'Endocrinología',
            ],
           [
                'nombre' => 'Gastroenterología',
            ],
           [
                'nombre' => 'Genética',
            ],
           [
                'nombre' => 'Ginecología',
            ],
           [
                'nombre' => 'Hematología',
            ],
           [
                'nombre' => 'Hepatología',
            ],
           [
                'nombre' => 'Infectología',
            ],
           [
                'nombre' => 'Medicina General',
            ],
           [
                'nombre' => 'Nefrología',
            ],
           [
                'nombre' => 'Neumología',
            ],
           [
                'nombre' => 'Neurología',
            ],
           [
                'nombre' => 'Neurocirugía',
            ],
           [
                'nombre' => 'Oftalmología',
            ],
           [
                'nombre' => 'Ortopedia',
            ],
           [
                'nombre' => 'Otorrinolaringología',
            ],
           [
                'nombre' => 'Radiología',
            ],
           [
                'nombre' => 'Oncología',
            ],
           [
                'nombre' => 'Pediatría',
            ],
           [
                'nombre' => 'Geriatría',
            ],
           [
                'nombre' => 'Proctología',
            ],
           [
                'nombre' => 'Psiquiatría',
            ],
           [
                'nombre' => 'Reumatología',
            ],
           [
                'nombre' => 'Traumatología',
            ],
           [
                'nombre' => 'Urología',
            ],
         ]);
    }
}
