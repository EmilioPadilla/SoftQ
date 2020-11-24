<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Absences extends Model
{
    //assigning db table model is associated with
    protected $table = 'absences';
    public $timestamps = false;

     //Get the employee 
     public function employees(){
        return $this->belongsTo('App\Models\Employee', 'employees_id');
    }


}
