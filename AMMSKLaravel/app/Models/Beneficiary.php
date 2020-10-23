<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Beneficiary extends Model
{
    //assigning db table model is associated with
    protected $table = 'beneficiaries';

    //fillable fields
    protected $fillable = [
        'status_id, headquarter_id, nombreCompleto, apodo, fechaNacimiento, 
        edadMental, fechaIngreso, destino numCurp, canalizador, vinculosFam, 
        dxMedico, fechaEgreso, motivoEgreso'];
	
    
    //Get the status 
    public function status(){
        return $this->belongsTo('App\Models\Status', 'status_id');
    }

    //Get headquarter of the beneficiary 
    public function headquarter(){
        return $this->belongsTo('App\Models\Headquarter', 'headquarter_id');
    }

    public function file() {
        return $this->hasMany('App\Models\BenefFile', 'id');
    }

}
