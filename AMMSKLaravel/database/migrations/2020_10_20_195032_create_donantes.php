<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDonantes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('donantes', function (Blueprint $table) {
            $table->id()->from(1);
            $table->foreignId('idRecurrencia')->references("id")->on("_recurrencia")->onDelete("cascade")->onUpdate("cascade");
            $table->foreignId('idTipoDonante')->references("id")->on("tipo_de_donante")->onDelete("cascade")->onUpdate("cascade");
            $table->foreignId('idTipoDonacion')->references("id")->on("tipo_de_donacion")->onDelete("cascade")->onUpdate("cascade");


            //Patronato
            $table->string('nombreCompleto1', 50)->nullable();
            $table->date('fechaCumpleaños1')->nullable();
            $table->string('RFC1', 50)->nullable();
            $table->string('correo1', 50)->nullable();
            $table->string('telefono1', 50)->nullable();
            $table->string('celular1', 50)->nullable();
            //Gobierno
            $table->string('RazonSocial2', 50)->nullable();
            $table->string('Nombre2', 50)->nullable();
            $table->string('calle2', 20)->nullable();
            $table->string('noInterior2', 30)->nullable();
            $table->string('noExterior2', 30)->nullable();
            $table->string('codigoPostal2', 30)->nullable();
            $table->string('colonia2', 30)->nullable();
            //seeder de la ciudad

            //facturacion 
            $table->string('RazonSocial', 50);
            $table->string('RFC', 50);
            $table->string('calle', 20);
            $table->string('noInterior', 30);
            $table->string('noExterior', 30);
            $table->string('codigoPostal', 30);
            $table->string('colonia', 30);  
            $table->string('ciudad', 50);  
            $table->string('municipio', 50);  
            $table->string('estado', 50);  
            $table->string('pais', 50);  
            $table->string('correo', 50);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('donantes');
    }
}
