<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMedicalAppointmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('medical_appointments', function (Blueprint $table) {
            $table->id()->from(1);
  					$table->foreignId('beneficiary_id')->constrained('beneficiaries');
  					$table->date('fechaConsulta');
  					$table->time('horaConsulta');
  					$table->string('diagnostico', 100)->nullable();
  					$table->string('direccion', 150);
  					$table->string('hospital', 100)->nullable();
  					$table->integer('consultorio')->nullable();
  					$table->foreignId('specialty_id')->constrained('specialties');
  					$table->text('comentario')->nullable();
});
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('medical_appointments');
    }
}
