<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmployeeFilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employee_files', function (Blueprint $table) {
          $table->id()->from(1);
          $table->foreignId('employees_id')->constrained('employees');
          $table->string("categoria", 50)->nullable();
          $table->string("path", 200);
          $table->text("comentario")->nullable();
          $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('employee_files');
    }
}
