<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    //assigning db table model is associated with
    protected $table = 'employees';
    public $timestamps = false;
    //The data that we want to be uploaded in a massive way.
    protected $fillable = ['nombreCompleto', 'fechaIngreso','telefono','diasLaborales', 'salarioxhora'];

}
