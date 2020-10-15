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
        Schema::create('contacto__donante', function (Blueprint $table) {
            
            $table->id()->from(1);
            $table->string('nombreCompleto', 50);
            $table->string('cargo', 20);
            $table->string('correo', 50);
            $table->string('telefono', 50);
            $table->string('celular', 50);
            $table->date('fechaCumpleaños');


        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('contacto__donante');
    }
}
