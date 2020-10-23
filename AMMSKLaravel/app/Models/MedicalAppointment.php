<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MedicalAppointment extends Model
{
    //assigning db table model is associated with
    protected $table = 'medical_appointments';

    //fillable fields
    protected $fillable = ['beneficiary_id, fechaConsulta, horaConsulta, diagnostico, direccion, hospital, specialty_id, comentario'];

    //Get the beneficiary to which the medical appointment belongs 
    public function beneficiary(){
        return $this->belongsTo('App\Models\Beneficiary', 'beneficiary_id');
    }

    //Get the specialty of the medical appointment
    public function specialty(){
        return $this->belongsTo('App\Models\Specialty', 'specialty_id');
    }
}