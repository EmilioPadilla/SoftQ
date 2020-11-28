<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmpFile extends Model
{
    //assigning db table model is associated with
    protected $table = 'employee_files';

    function employee() {
        return $this->belongsTo('App\Models\Employee', 'employees_id');
    }
}
