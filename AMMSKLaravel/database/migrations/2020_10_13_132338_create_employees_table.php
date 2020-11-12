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
            $table->foreignId('status_id')->default(1)->constrained('status_emp');
            $table->foreignId('civil_status_id')->constrained('civil_status')->nullable();
    		$table->foreignId('scholarship_id')->constrained('scholarship')->nullable();
            $table->foreignId('headquarter_id')->constrained('headquarters')->nullable();
            $table->string("nombreCompleto")->nullable();
            $table->date("fechaNac")->nullable();
            $table->integer("salarioxhora")->nullable();
            $table->date("fechaIngreso")->nullable();
            $table->string("RFC", 20)->nullable();
            $table->string("CURP", 20)->nullable();
            $table->integer("numSeguroSocial")->nullable();
            $table->string("infonavit", 50)->nullable();
            $table->string("estado", 100)->nullable();
            $table->string("ciudad", 100)->nullable();
            $table->string("calle", 100)->nullable();
            $table->string("numExterior", 20)->nullable();
            $table->string("numInterior", 20)->nullable();
            $table->string("colonia", 100)->nullable();
            $table->string("codigoPostal", 5)->nullable();
            $table->string("telefono", 15)->nullable();
            $table->string("celular", 15)->nullable();
            $table->string("correo", 100)->nullable();
            $table->boolean("voluntario")->nullable();
            $table->string("diasLaborales")->nullable();
            $table->integer("numBeneficiarios")->nullable();
            $table->string("frecuenciaSalario")->nullable();
            $table->string("puesto")->nullable();
            $table->date("fechaEgreso")->nullable();
            $table->text("motivoEgreso")->nullable();
            $table->date("fechaReingreso")->nullable();
            $table->text("motivoReingreso")->nullable();
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
