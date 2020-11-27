<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBenefEmployeeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('benef_employee', function (Blueprint $table) {
            $table->id()->from(1);
            $table->foreignId('employees_id')->constrained('employees');
            $table->foreignId('kinship_id')->constrained('kinship');
            $table->integer("porcentaje");
            $table->String("nombreCompleto")->nullable();
            $table->String("telefono")->nullable();
            $table->String("direccion")->nullable();
            $table->String("rfc")->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('benef_employee');
    }
}
