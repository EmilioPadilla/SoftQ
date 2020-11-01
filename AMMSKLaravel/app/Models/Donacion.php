<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Donacion extends Model
{
    protected $table = 'donacion';
    public $timestamps = false;
    protected $fillable = ['idTipoDonacion','fechaDonacion','descripcion','monto'];
}
