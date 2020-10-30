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
          $table->foreignId('status_id')->default(1)->constrained('status');
  			  $table->foreignId('headquarter_id')->default(1)->constrained('headquarters');
          $table->string('nombreCompleto', 50)->nullable();
          $table->string('apodo', 50)->nullable();
          $table->date('fechaNacimiento')->nullable();
  		    $table->integer('edadMental')->nullable();;
    			$table->date('fechaIngreso')->nullable();
    			$table->string('numCurp', 25)->nullable();
    			$table->string('canalizador', 100)->nullable();
    			$table->string('dxMedico', 125)->nullable();
    			$table->text('vinculosFam')->nullable();
    			$table->date('fechaEgreso')->nullable();
    			$table->text('motivoEgreso')->nullable();
          $table->string('destino', 100)->nullable();
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
