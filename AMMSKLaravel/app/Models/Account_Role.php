<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Account_Role extends Model
{
    protected $table = 'accounts_roles';
    public $timestamps = false;
    protected $fillable = ['idRol', 'idAccount'];

}