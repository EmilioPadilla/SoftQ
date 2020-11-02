<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Donantes extends Model
{
    protected $table = '_donante';
    public $timestamps = false;
    protected $fillable = ['idRecurrencia','idTipoDonante','nombreCompleto1', 'fechaCumpleaños1','RFC1','correo1','telefono1','celular1',
                            'RazonSocial','RFC','calle','noInterior','noExterior','codigoPostal','colonia','ciudad','municipio','estado','pais','correo'];

    //Get headquarter of the beneficiary     
    public function tipoDonante(){
        return $this->belongsTo('App\Models\TipoDonante', 'idTipoDonante');
       }

      
}
