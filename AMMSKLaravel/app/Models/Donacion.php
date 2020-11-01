<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Donacion extends Model
{
    protected $table = 'donacion';
    public $timestamps = false;
    protected $fillable = ['idDonante','idTipoDonacion','fechaDonacion','descripcion','monto'];
}
