<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBeneficiariesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('beneficiaries', function (Blueprint $table) {
            $table->id()->from(1);
            $table->foreignId('status_id')->constrained('status');
  			$table->foreignId('headquarter_id')->constrained('headquarters');
            $table->string('nombreCompleto', 50);
            $table->string('apodo', 50);
    		$table->date('fechaNacimiento');
  		    $table->integer('edadMental');
  			$table->date('fechaIngreso');
  			$table->string('numCurp', 25);
  			$table->string('canalizador', 100);
  			$table->string('dxMedico', 125);
  			$table->text('vinculosFam');
  			$table->date('fechaEgreso');
  			$table->text('motivoEgreso');
            $table->string('destino', 100);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('beneficiaries');
    }
}
