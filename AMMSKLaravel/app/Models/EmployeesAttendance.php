<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeesAttendance extends Model
{
    protected $table = 'employees_attendance';
    public $timestamps = false;
    protected $guarded = [];
}
