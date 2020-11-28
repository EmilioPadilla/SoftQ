<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StatesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('estados')->insert([
            [ 
                "abreviatura"=> "AGS",
                 "descripcion"=> "AGUASCALIENTES" 
            ],
            [ "abreviatura"=> "BC",  "descripcion"=> "BAJA CALIFORNIA" ],
            [ "abreviatura"=> "BCS", "descripcion"=> "BAJA CALIFORNIA SUR" ],
            [ "abreviatura"=> "CHI", "descripcion"=> "CHIHUAHUA" ],
            [ "abreviatura"=> "CHS", "descripcion"=> "CHIAPAS" ],
            [ "abreviatura"=> "CMP", "descripcion"=> "CAMPECHE" ],
            [ "abreviatura"=> "CMX", "descripcion"=> "CIUDAD DE MEXICO" ],
            [ "abreviatura"=> "COA", "descripcion"=> "COAHUILA" ],
            [ "abreviatura"=> "COL", "descripcion"=> "COLIMA" ],
            [ "abreviatura"=> "DGO", "descripcion"=> "DURANGO" ],
            [ "abreviatura"=> "GRO", "descripcion"=> "GUERRERO" ],
            [ "abreviatura"=> "GTO", "descripcion"=> "GUANAJUATO" ],
            [ "abreviatura"=> "HGO", "descripcion"=> "HIDALGO" ],
            [ "abreviatura"=> "JAL", "descripcion"=> "JALISCO" ],
            [ "abreviatura"=> "MCH", "descripcion"=> "MICHOACAN" ],
            [ "abreviatura"=> "MEX", "descripcion"=> "ESTADO DE MEXICO" ],
            [ "abreviatura"=> "MOR", "descripcion"=> "MORELOS" ],
            [ "abreviatura"=> "NAY", "descripcion"=> "NAYARIT" ],
            [ "abreviatura"=> "NL",  "descripcion"=> "NUEVO LEON" ],
            [ "abreviatura"=> "OAX", "descripcion"=> "OAXACA" ],
            [ "abreviatura"=> "PUE", "descripcion"=> "PUEBLA" ],
            [ "abreviatura"=> "QR",  "descripcion"=> "QUINTANA ROO" ],
            [ "abreviatura"=> "QRO", "descripcion"=> "QUERETARO" ],
            [ "abreviatura"=> "SIN", "descripcion"=> "SINALOA" ],
            [ "abreviatura"=> "SLP", "descripcion"=> "SAN LUIS POTOSI" ],
            [ "abreviatura"=> "SON", "descripcion"=> "SONORA" ],
            [ "abreviatura"=> "TAB", "descripcion"=> "TABASCO" ],
            [ "abreviatura"=> "TLX", "descripcion"=> "TLAXCALA" ],
            [ "abreviatura"=> "TMS", "descripcion"=> "TAMAULIPAS" ],
            [ "abreviatura"=> "VER", "descripcion"=> "VERACRUZ" ],
            [ "abreviatura"=> "YUC", "descripcion"=> "YUCATAN" ],
            [ "abreviatura"=> "ZAC", "descripcion"=> "ZACATECAS" ], 
         ]);
     }
 }
