<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBenefPayrollTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('benef_payroll', function (Blueprint $table) {
            $table->id()->from(1);
            $table->string("RFC", 20);
            $table->string("calle", 100);
            $table->string("numExterior", 20);
            $table->string("numInterior", 20);
            $table->string("colonia", 100);
            $table->string("codigoPostal", 5);
            $table->string("telefono", 15);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('benef_payroll');
    }
}
