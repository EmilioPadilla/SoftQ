<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDelaysTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('delays', function (Blueprint $table) {
          $table->id()->from(1);
          $table->foreignId('employees_id')->constrained('employees');
          $table->text("motivoRetardo");
          $table->date("fecha");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('delays');
    }
}
