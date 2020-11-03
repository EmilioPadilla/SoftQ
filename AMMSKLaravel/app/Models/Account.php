<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    protected $table = 'accounts';
    public $timestamps = false;
    protected $fillable = ['username', 'password', 'idEmployee'];

    public function employee()
    {
        return $this->hasOne('App\Models\Employee', 'idEmployee');
    }

}
