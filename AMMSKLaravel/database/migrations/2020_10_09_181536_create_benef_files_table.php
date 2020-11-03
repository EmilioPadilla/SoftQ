<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBenefFilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('benef_files', function (Blueprint $table) {
            $table->id()->from(1);
  			$table->foreignId('beneficiary_id')->constrained('beneficiaries');
            $table->string('categoria', 30);
  			$table->string('path', 500);
  			$table->text('comentario')->nullable();
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
        Schema::dropIfExists('benef_files');
    }
}
