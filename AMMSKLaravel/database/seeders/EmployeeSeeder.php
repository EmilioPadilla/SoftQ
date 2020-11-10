<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('employees')->insert([
            [
                'civil_status_id' => '1',
            
                'scholarship_id' => '7',
            
                'headquarter_id' => '1',
            
                'nombreCompleto' => 'Iván Díaz Peralta',
            
                'salarioxhora' => '250',
            
                'fechaIngreso' => '2020-10-06',
           
                'RFC' => 'A123456789B123456789',
            
                'CURP' => 'A123456789B123456789',
            
                'numSeguroSocial' => '123555',
            
                'infonavit' => 'Si',
            
                'calle' => 'Pie de la Cuesta',
            
                'numExterior' => '15',
            
                'numInterior' => '12',
            
                'colonia' => 'Fundadores',
            
                'codigoPostal' => '76117',
            
                'telefono' => '4425877319',
            
                'celular' => '4425877319',
            
                'correo' => 'micorreo@gmail.com',
            
                'voluntario' => '0',
            
                'diasLaborales' => 'Todos',
            
                'numBeneficiarios' => '2',
            
                'fechaEgreso' => '2020-10-31',
            
                'motivoEgreso' => 'SA'
            ],
            [
                'civil_status_id' => '1',
            
                'scholarship_id' => '7',
            
                'headquarter_id' => '1',
            
                'nombreCompleto' => 'Eric Torres',
            
                'salarioxhora' => '250',
            
                'fechaIngreso' => '2020-10-06',
           
                'RFC' => 'A123456789B123456789',
            
                'CURP' => 'A123456789B123456789',
            
                'numSeguroSocial' => '123555',
            
                'infonavit' => 'Si',
            
                'calle' => 'Pie de la Cuesta',
            
                'numExterior' => '15',
            
                'numInterior' => '12',
            
                'colonia' => 'Fundadores',
            
                'codigoPostal' => '76117',
            
                'telefono' => '4425877319',
            
                'celular' => '4425877319',
            
                'correo' => 'micorreo@gmail.com',
            
                'voluntario' => '0',
            
                'diasLaborales' => 'Todos',
            
                'numBeneficiarios' => '2',
            
                'fechaEgreso' => '2020-10-31',
            
                'motivoEgreso' => 'SA',
            ],
            [
                'civil_status_id' => '1',
            
                'scholarship_id' => '7',
            
                'headquarter_id' => '1',
            
                'nombreCompleto' => 'Emilio Aguilera',
            
                'salarioxhora' => '250',
            
                'fechaIngreso' => '2020-10-06',
           
                'RFC' => 'A123456789B123456789',
            
                'CURP' => 'A123456789B123456789',
            
                'numSeguroSocial' => '123555',
            
                'infonavit' => 'Si',
            
                'calle' => 'Pie de la Cuesta',
            
                'numExterior' => '15',
            
                'numInterior' => '12',
            
                'colonia' => 'Fundadores',
            
                'codigoPostal' => '76117',
            
                'telefono' => '4425877319',
            
                'celular' => '4425877319',
            
                'correo' => 'micorreo@gmail.com',
            
                'voluntario' => '0',
            
                'diasLaborales' => 'Todos',
            
                'numBeneficiarios' => '2',
            
                'fechaEgreso' => '2020-10-31',
            
                'motivoEgreso' => 'SA',
            ]

            ]);
    }
}
