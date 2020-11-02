<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContactoDonante extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contacto_donante', function (Blueprint $table) {
            $table->id()->from(1);
            $table->foreignId('idDonante')->references("id")->on("_donante")->onDelete("cascade")->onUpdate("cascade");
            $table->string('nombreCompleto', 50)->nullable();
            $table->string('cargo', 50)->nullable();
            $table->date('fechaCumpleaño')->nullable();
            $table->string('correo1', 50)->nullable();
            $table->string('telefono1', 50)->nullable();
            $table->string('celular1', 50)->nullable();
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('contacto_donante');
    }
}
