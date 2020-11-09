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
            $table->foreignId('civil_status_id')->constrained('civil_status');
    		$table->foreignId('scholarship_id')->constrained('scholarship');
            $table->foreignId('headquarter_id')->constrained('headquarters');
            $table->string("nombreCompleto");
            $table->date("fechaNac");
            $table->integer("salarioxhora");
            $table->date("fechaIngreso");
            $table->string("RFC", 20)->nullable();
            $table->string("CURP", 20)->nullable();
            $table->integer("numSeguroSocial")->nullable();
            $table->string("infonavit", 50)->nullable();
            $table->string("estado", 100);
            $table->string("ciudad", 100);
            $table->string("calle", 100)->nullable();
            $table->string("numExterior", 20)->nullable();
            $table->string("numInterior", 20)->nullable();
            $table->string("colonia", 100)->nullable();
            $table->string("codigoPostal", 5)->nullable();
            $table->string("telefono", 15)->nullable();
            $table->string("celular", 15);
            $table->string("correo", 100)->nullable();
            $table->boolean("voluntario")->nullable();
            $table->string("diasLaborales")->nullable();
            $table->integer("numBeneficiarios")->nullable();
            $table->string("frecuenciaSalario");
            $table->string("puesto");
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
