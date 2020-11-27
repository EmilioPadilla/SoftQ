<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Benef_Employee extends Model
{
    //assigning db table model is associated with
    protected $table = 'benef_employee';
    public $timestamps = false;

    function employee() {
        return $this->belongsTo('App\Models\Employee', 'employees_id');
    }

}
