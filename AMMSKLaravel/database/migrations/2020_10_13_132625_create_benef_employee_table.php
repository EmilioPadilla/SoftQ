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
            $table->foreignId('emp_id')->constrained('employees');
    			  $table->foreignId('benef_id')->constrained('benef_payroll');
            $table->foreignId('kinship_id')->constrained('kinship');
            $table->integer("porcentaje");
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
