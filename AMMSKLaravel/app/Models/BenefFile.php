<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BenefFile extends Model
{
    //assigning db table model is associated with
    protected $table = 'benef_files';

    function beneficiary() {
        return $this->belongsTo('App\Models\Beneficiary', 'beneficiary_id');
    }
}
