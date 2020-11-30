<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmployeesAttendanceTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employees_attendance', function (Blueprint $table) {
            $table->id()->from(1);
            $table->foreignId('idEmployees')->constrained('employees');
            $table->foreignId('idShifts')->constrained('shifts');
            $table->date("fecha");
            $table->timestamp("horaIngreso")->nullable();
            $table->timestamp("horaSalida")->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('employees_attendance');
    }
}
