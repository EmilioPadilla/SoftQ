<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Donacion; 
use Illuminate\Support\Facades\DB;

class DonacionController extends Controller
{
     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $donacion = new Donacion;
        $donacion->idTipoDonacion= $request-> idTipoDonacion;
        $donacion->fechaDonacion= $request-> fechaDonacion;
        $donacion->descripcion= $request-> descripcion;
        $donacion->monto= $request->monto;
        $donacion->idDonante= $request->idDonante;


        $donacion->save();

    }

    public function showTable(){
        $datos = DB::table('_donacion')
                    ->join('tipo_donante', '_donante.idTipoDonante', '=', 'tipo_donante.id')
                    ->join('recurrencia', '_donante.idRecurrencia', '=', 'recurrencia.id')
                    ->select('_donante.id', 'tipo_donante.nombre', '_donante.nombreCompleto1','recurrencia.nombreR')
                    ->get();
        $respuesta = '<thead> <tr> <th> Nombre </th> <th> Tipo </th> <th> Recurrencia </th> <th> Acciones </th> </tr> </thead> <tbody>';
        foreach ($datos as $res){
            $respuesta .= '<tr> <td id="jkl">'. $res->nombreCompleto1. '</td>';
            $respuesta .= '<td>'.$res->nombre.'</td>';
            $respuesta .= '<td>'.$res->nombreR.'</td>';
            $respuesta .= '<td> <div class="row"> <div class="col"> <a href="/admin/ViewSpecificDonor/'.$res->id.'"> <button id="verDetalle" type="button" class="btn btn-info btn-sm" > <i class="fa fa-eye"> </i></button> ';
           $respuesta .= '</a> </div> <div class="col" > <a href="/admin/Donacion/'.$res->id.'"> <button id="registrarDonacion" type="button" class="btn btn-primary  btn-sm"> <i class="fa fa-plus" aria-hidden="true"></i></button> ';
           $respuesta .= '</a> </div> <div class="col" > <a href="/admin/contactoDonante/'.$res->id.'"> <button id="registrarContactoDonate" type="button"  class="btn btn-primary btn-sm"> <i class="fa fa-address-book" aria-hidden="true"></i> </button> ';
           $respuesta .= '</a> </div> <div class="col" > <a href="/admin/contactoDonante/'.$res->id.'"> <button id="registrarContactoDonate" type="button"  class="btn btn-success btn-sm"> <i class="fa fa-repeat" aria-hidden="true"></i> </button>';
           $respuesta .= '</a> </div> <div class="col" > <a href="/admin/contactoDonante/'.$res->id.'"> <button id="registrarContactoDonate" type="button"  class="btn btn-danger btn-sm"> <i class="fa fa-trash-alt"> </i> </button> </a> </div> </div> </td> </tr> ';

        }
        $respuesta .= '</tbody>';
        return $respuesta;
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Donacion::where('id',$id)->get();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Donantes $donante)
    {
      
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
