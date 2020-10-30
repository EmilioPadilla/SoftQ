<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeesShifts extends Model
{
    //assigning db table model is associated with
    protected $table = 'employees_shifts';
    public $timestamps = false;
}
