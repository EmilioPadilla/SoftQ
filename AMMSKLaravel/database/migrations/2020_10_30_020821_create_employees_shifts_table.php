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
        Schema::create('employees_shifts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('idEmployees')->constrained('employees');
            $table->foreignId('idShifts')->constrained('shifts');
            $table->string('diaSemana');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('employees_shifts');
    }
}
