<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAccountsRolesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('accounts_roles', function (Blueprint $table) {
            $table->id();
            $table->foreignId("idRol");
            $table->foreignId("idAccount");
            $table->foreign("idAccount")->references("id")->on("Accounts")->onDelete("cascade")->onUpdate("cascade");
            $table->foreign("idRol")->references("id")->on("Roles")->onDelete("cascade")->onUpdate("cascade");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('accounts_roles');
    }
}
