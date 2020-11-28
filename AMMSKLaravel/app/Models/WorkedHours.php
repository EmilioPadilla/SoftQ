<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkedHours extends Model
{
    //assigning db table model is associated with
    protected $table = 'worked_hours';
    public $timestamps = false;
}
