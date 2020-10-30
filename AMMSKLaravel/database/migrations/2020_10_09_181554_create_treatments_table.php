<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTreatmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('treatments', function (Blueprint $table) {
            $table->id()->from(1);
  			$table->foreignId('beneficiary_id')->constrained('beneficiaries');
            $table->string('nombreMed', 70);
  			$table->string('funcionMed', 100)->nullable();
  			$table->integer('dosis');
  			$table->foreignId('mode_id')->constrained('modes');
  			$table->integer('lapso');
  			$table->date('fechaInicio');
  			$table->date('fechaTermino');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('treatments');
    }
}
