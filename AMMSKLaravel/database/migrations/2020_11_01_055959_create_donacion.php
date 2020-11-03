<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDonacion extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('donacion', function (Blueprint $table) {
            $table->id()->from(1);
            $table->foreignId('idDonante')->references("id")->on("_donante")->onDelete("cascade")->onUpdate("cascade");
            $table->foreignId('idTipoDonacion')->references("id")->on("tipo_donacion")->onDelete("cascade")->onUpdate("cascade");
            $table->date('fechaDonacion')->nullable();
            $table->string('descripcion', 100)->nullable();
            $table->string('monto', 50)->nullable();
            $table->string('folio', 50)->nullable();
            $table->string('factura', 50)->nullable();


        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('donacion');
    }
}
