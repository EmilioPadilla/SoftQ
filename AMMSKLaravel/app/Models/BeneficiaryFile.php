<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BeneficiaryFile extends Model
{
    //assigning db table model is associated with
    protected $table = 'beneficiary_files';

    function beneficiary() {
        return $this->belongsTo('App\Models\Beneficiary', 'beneficiary_id');
    }

    //Get category of file 
    public function categoria(){
        return $this->belongsTo('App\Models\FileCategory', 'category_id');
    }
}
