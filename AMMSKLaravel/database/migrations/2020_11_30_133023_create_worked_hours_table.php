<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWorkedHoursTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('worked_hours', function (Blueprint $table) {
          $table->id()->from(1);
          $table->foreignId('employees_id')->constrained('employees');
          $table->foreignId('employees_shifts_id')->constrained('employees_shifts');
          $table->timestamp("horaIngreso")->nullable();
          $table->timestamp("horaSalida")->nullable();
          $table->timestamp("totalH")->nullable();
          


        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('worked_hours');
    }
}
