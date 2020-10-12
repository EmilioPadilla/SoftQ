<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRolesPrivileges extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('roles_privileges', function (Blueprint $table) {
            $table->id();
            $table->foreignId("idRol");
            $table->foreign("idRol")->references("id")->on("roles")->onDelete("cascade")->onUpdate("cascade");
            $table->foreignId("idPrivilege");
            $table->foreign("idPrivilege")->references("id")->on("privileges")->onDelete("cascade")->onUpdate("cascade");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('roles_privileges');
    }
}
