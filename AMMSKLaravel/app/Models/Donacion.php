<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Donacion extends Model
{
    protected $table = 'donacion';
    public $timestamps = false;
    protected $fillable = ['idDonante','idTipoDonacion','fechaDonacion','descripcion','monto'];
    
    public static function prueba($id){
        $juegos = self::select('tipo_donacion.nombre','donacion.id as idD','donacion.idTipoDonacion as tipo_donacion','donacion.monto as montos','donacion.descripcion as descripciones','donacion.fechaDonacion as fechas')                       
        ->Where('_donante.id',$id)  

        ->join('tipo_donacion', 'donacion.idTipoDonacion', '=', 'tipo_donacion.id')
        ->join('_donante', 'donacion.idDonante', '=', '_donante.id')

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
