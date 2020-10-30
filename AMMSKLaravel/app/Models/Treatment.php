<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Treatment extends Model
{
    //assigning db table model is associated with
    protected $table = 'treatments';

    public $timestamps = false;

    //fillable fields
    protected $fillable = ['beneficiary_id, nombreMed, funcionMed, dosis, mode_id, lapso, fechaInicio, fechaTermino'];

    //Get the beneficiary to which the treatment belongs 
    public function beneficiary(){
        return $this->belongsTo('App\Models\Beneficiary', 'beneficiary_id');
    }

    //Get the mode of medication
    public function mode(){
        return $this->belongsTo('App\Models\Mode', 'mode_id');
    }
}
