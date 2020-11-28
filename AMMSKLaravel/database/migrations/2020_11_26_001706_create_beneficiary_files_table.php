<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBeneficiaryFilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('beneficiary_files', function (Blueprint $table) {
                $table->id()->from(1);
                $table->foreignId('beneficiary_id')->constrained('beneficiaries');
                $table->foreignId('category_id')->constrained('file_category');
                $table->string('path', 500);
                $table->string('comentario', 50)->nullable();
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
        Schema::dropIfExists('beneficiary_files');
    }
}
