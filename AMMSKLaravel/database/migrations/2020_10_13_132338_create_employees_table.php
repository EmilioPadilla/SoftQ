<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmployeesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->id()->from(1);
            $table->foreignId('civil_status_id')->constrained('civil_status');
    			  $table->foreignId('scholarship_id')->constrained('scholarship');
            $table->foreignId('headquarter_id')->constrained('headquarters');
            $table->integer("salarioxhora");
            $table->date("fechaIngreso");
            $table->string("RFC", 20);
            $table->string("CURP", 20);
            $table->integer("numSeguroSocial");
            $table->string("infonavit", 50);
            $table->string("calle", 100);
            $table->string("numExterior", 20);
            $table->string("numInterior", 20);
            $table->string("colonia", 100);
            $table->string("codigoPostal", 5);
            $table->string("telefono", 15);
            $table->string("celular", 15);
            $table->string("correo", 100);
            $table->boolean("voluntario");
            $table->string("diasLaborales");
            $table->integer("numBeneficiarios");
            $table->date("fechaEgreso");
            $table->text("motivoEgreso");

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('employees');
    }
}
