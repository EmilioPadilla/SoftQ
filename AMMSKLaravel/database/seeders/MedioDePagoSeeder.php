<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class MedioDePagoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('medio_de_pago')->insert([
            [
                'nombre' => 'Efectivo',
            ],
            [
                'nombre' => 'Transferencia',
            ],
            [
                'nombre' => 'PayPal',
            ],
            [
                'nombre' => 'Tarjeta de Credito',
            ],
            [
                'nombre' => 'Tarjeta Debito',
            ],
            [
                'nombre' => 'Cheque',
            ],
            ]);
    }
}
