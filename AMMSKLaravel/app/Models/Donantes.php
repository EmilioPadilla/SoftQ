<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Donantes extends Model
{
    protected $table = '_donante';
    public $timestamps = false;
    protected $fillable = ['nombreCompleto1', 'fechaCumpleaños1','RFC1','correo1','telefono1','celular1'];
}
