<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDonante extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('_donante', function (Blueprint $table) {
            $table->id()->from(1);
            $table->foreignId('idRecurrencia')->references("id")->on("recurrencia")->onDelete("cascade")->onUpdate("cascade");
            $table->foreignId('idTipoDonante')->references("id")->on("tipo_donante")->onDelete("cascade")->onUpdate("cascade");
            $table->string('nombreCompleto1', 50)->nullable();

            //Patronato
            $table->date('fechaCumpleaños1')->nullable();
            $table->string('RFC1', 50)->nullable();
            $table->string('correo1', 50)->nullable();
            $table->string('telefono1', 50)->nullable();
            $table->string('celular1', 50)->nullable();
            
            
            //seeder de la ciudad
    

            //facturacion 
            $table->string('RazonSocial', 50)->nullable();;
            $table->string('RFC', 50)->nullable();;
            $table->string('calle', 20)->nullable();;
            $table->string('noInterior', 30)->nullable();;
            $table->string('noExterior', 30)->nullable();;
            $table->string('codigoPostal', 30)->nullable();;
            $table->string('colonia', 30)->nullable();;  
            $table->string('ciudad', 50)->nullable();;  
            $table->string('municipio', 50)->nullable();;  
            $table->string('estado', 50)->nullable();;  
            $table->string('pais', 50)->nullable();;  
            $table->string('correo', 50)->nullable();;

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('donante');
    }
}
