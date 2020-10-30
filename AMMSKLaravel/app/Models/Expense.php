<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
        //assigning db table model is associated with
        protected $table = 'expenses';

        public $timestamps = false;
    
        //fillable fields
        protected $fillable = ['specialty_id, fecha, pagoA, monto, descripcion'];
    
        //Get the specialty of the medical appointment
        public function category(){
            return $this->belongsTo('App\Models\Category', 'category_id');
        }
}
