<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmployeesShiftsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shifts_worked', function (Blueprint $table) {
            $table->id();
            $table->foreignId('idEmployees')->constrained('employees');
            $table->date('horaEntrada')->constrained('shifts');
            $table->date('horaSalida');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('shifts_worked');
    }
}
