<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactoDonante extends Model
{
    protected $table = 'contacto_donante';
    public $timestamps = false;
    protected $fillable = ['idDonante','nombreCompleto','cargo','fechaCumpleaño','correo1','telefono1','celular1'];
}
