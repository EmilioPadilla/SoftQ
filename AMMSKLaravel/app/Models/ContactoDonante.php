<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactoDonante extends Model
{
    protected $table = 'contacto_donante';
    public $timestamps = false;
    protected $fillable = ['idDonante','nombreCompleto','cargo','fechaCumpleaño','correo1','telefono1','celular1'];

    public static function prueba($id){
        $juegos = self::select('contacto_donante.id as idD','contacto_donante.nombreCompleto as nombre','contacto_donante.cargo as cargo','contacto_donante.fechaCumpleaño as cumple','contacto_donante.correo1 as correo','contacto_donante.telefono1 as tel','contacto_donante.celular1 as cel')                       
        ->Where('_donante.id',$id)  

        ->join('_donante', 'contacto_donante.idDonante', '=', '_donante.id')

        ->get();        
              $prueba= $juegos->toJson();
              //JSON.stringify($juegos); 
                 return $prueba;       
       /* $response = [];        
        foreach($juegos as $item){        
                $id = $item->idD;         
                   $response[$id] = ["idDonacion"=>$item->idD, "tipoDonacion"=>$item->tipo_donacion, "montoD"=>$item->montos,"descripcionD"=>$item->descripciones, "fechaD"=>$item->fechas];        
                }        
                return $response;*/ 
    }

}
