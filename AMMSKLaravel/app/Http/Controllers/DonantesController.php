<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Donantes; 
use App\Models\Donacion; 
use App\Models\ContactoDonante; 



use Illuminate\Support\Facades\DB;


class DonantesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $donantes = Donantes::with('tipoDonante')->get();
                return response()->json($donantes);
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
        $donante = new Donantes;

        $donante->idRecurrencia= $request-> idRecurrencia;
        $donante->idTipoDonante= $request-> idTipoDonante;

        //Datos donante particular/patronato
        $donante->nombreCompleto1 = $request -> nombreCompleto1;
        $donante->fechaCumpleaños1 = $request -> fechaCumpleaños1;
        $donante->RFC1 = $request -> RFC1;
        $donante->correo1 = $request -> correo1;
        $donante->telefono1 = $request -> telefono1;
        $donante->celular1 = $request -> celular1;

      

        //Datos facturacion
        $donante->RazonSocial = $request -> RazonSocial;
        $donante->RFC = $request -> RFC;
        $donante->calle = $request -> calle;
        $donante->noInterior = $request -> noInterior;
        $donante->noExterior = $request -> noExterior;
        $donante->codigoPostal = $request -> codigoPostal;
        $donante->colonia = $request -> colonia;
        $donante->ciudad = $request -> ciudad;
        $donante->municipio = $request -> municipio;
        $donante->estado = $request -> estado;
        $donante->pais = $request -> pais;
        $donante->correo = $request -> correo;

        $donante->save();

    }
    //activos
    public function showTable(){
        $datos = DB::table('_donante')
                    ->join('tipo_donante', '_donante.idTipoDonante', '=', 'tipo_donante.id')
                    ->join('recurrencia', '_donante.idRecurrencia', '=', 'recurrencia.id')
                    ->select('_donante.id', 'tipo_donante.nombre', '_donante.nombreCompleto1','recurrencia.nombreR')
                    ->where('_donante.status_id','1')
                    ->get();
        $respuesta = '<thead> <tr> <th> Nombre </th> <th> Tipo </th> <th> Recurrencia </th> <th> Acciones </th> </tr> </thead> <tbody>';
        foreach ($datos as $res){
            $respuesta .= '<tr> <td id="jkl">'. $res->nombreCompleto1. '</td>';
            $respuesta .= '<td>'.$res->nombre.'</td>';
            $respuesta .= '<td>'.$res->nombreR.'</td>';
            $respuesta .= '<td> <div class="row"> <div class="col"> <a href="/admin/ViewSpecificDonor/'.$res->id.'"> <button id="verDetalle" type="button" class="btn btn-info btn-sm" > <i class="fa fa-eye"> </i></button> ';
           $respuesta .= '</a> </div> <div class="col" > <a href="/admin/donacion/'.$res->id.'"> <button id="registrarDonacion" type="button" class="btn btn-primary  btn-sm"> <i class="fa fa-plus" aria-hidden="true"></i></button> ';
           $respuesta .= '</a> </div> <div class="col" > <a href="/admin/contactoDonante/'.$res->id.'"> <button id="registrarContactoDonate" type="button"  class="btn btn-primary btn-sm"> <i class="fa fa-address-book" aria-hidden="true"></i> </button> ';
           $respuesta .= '</a> </div> <div class="col" > <a href="/admin/egresarDonante/'.$res->id.'"> <button id="registrarContactoDonate" type="button"  class="btn btn-danger btn-sm"> <i class="fa fa-trash-alt"> </i> </button> </a> </div> </div> </td> </tr> ';
          // $respuesta .= '</a> </div> <div class="col" > <a href="/admin/re-ingresarDonante/'.$res->id.'"> <button id="registrarContactoDonate" type="button"  class="btn btn-success btn-sm"> <i class="fa fa-repeat" aria-hidden="true"></i> </button> </a> </div> </div> </td> </tr> ';


        }
        $respuesta .= '</tbody>';
        return $respuesta;
    }
    //inactivos
    public function showTableI(){
        $datos = DB::table('_donante')
                    ->join('tipo_donante', '_donante.idTipoDonante', '=', 'tipo_donante.id')
                    ->join('recurrencia', '_donante.idRecurrencia', '=', 'recurrencia.id')
                    ->select('_donante.id', 'tipo_donante.nombre', '_donante.nombreCompleto1','recurrencia.nombreR')
                    ->where('_donante.status_id','2')
                    ->get();
        $respuesta = '<thead> <tr> <th> Nombre </th> <th> Tipo </th> <th> Recurrencia </th> <th> Acciones </th> </tr> </thead> <tbody>';
        foreach ($datos as $res){
            $respuesta .= '<tr> <td id="jkl">'. $res->nombreCompleto1. '</td>';
            $respuesta .= '<td>'.$res->nombre.'</td>';
            $respuesta .= '<td>'.$res->nombreR.'</td>';
          // $respuesta .= '</a> </div> <div class="col" > <a href="/admin/egresarDonante/'.$res->id.'"> <button id="registrarContactoDonate" type="button"  class="btn btn-danger btn-sm"> <i class="fa fa-trash-alt"> </i> </button> </a> </div> </div> </td> </tr> ';
           $respuesta .= '<td> <div class="col" > <a href="/admin/re-ingresarDonante/'.$res->id.'"> <button id="registrarContactoDonate" type="button"  class="btn btn-success btn-sm"> <i class="fa fa-repeat" aria-hidden="true"></i> </button> </a> </div> </div> </td> </tr> ';


        }
        $respuesta .= '</tbody>';
        return $respuesta;
    }
    //busqueda por tipo de donante Activos
    public function showTipoDonante($tipo){
        $datos = DB::table('_donante')
                    ->join('tipo_donante', '_donante.idTipoDonante', '=', 'tipo_donante.id')
                    ->join('recurrencia', '_donante.idRecurrencia', '=', 'recurrencia.id')
                    ->join('status', '_donante.status_id', '=', 'status.id')
                    ->select('_donante.id', 'tipo_donante.nombre', '_donante.nombreCompleto1','recurrencia.nombreR')
                    ->where('_donante.idTipoDonante',$tipo)
                    ->where('_donante.status_id','1')
                    ->get();
        $respuesta = '<thead> <tr> <th> Nombre </th> <th> Tipo </th> <th> Recurrencia </th> <th> Acciones </th> </tr> </thead> <tbody>';
        foreach ($datos as $res){
            $respuesta .= '<tr> <td id="jkl">'. $res->nombreCompleto1. '</td>';
            $respuesta .= '<td>'.$res->nombre.'</td>';
            $respuesta .= '<td>'.$res->nombreR.'</td>';
            $respuesta .= '<td> <div class="row"> <div class="col"> <a href="/admin/ViewSpecificDonor/'.$res->id.'"> <button id="verDetalle" type="button" class="btn btn-info btn-sm" > <i class="fa fa-eye"> </i></button> ';
           $respuesta .= '</a> </div> <div class="col" > <a href="/admin/donacion/'.$res->id.'"> <button id="registrarDonacion" type="button" class="btn btn-primary  btn-sm"> <i class="fa fa-plus" aria-hidden="true"></i></button> ';
           $respuesta .= '</a> </div> <div class="col" > <a href="/admin/contactoDonante/'.$res->id.'"> <button id="registrarContactoDonate" type="button"  class="btn btn-primary btn-sm"> <i class="fa fa-address-book" aria-hidden="true"></i> </button> ';
           $respuesta .= '</a> </div> <div class="col" > <a href="/admin/egresarDonante/'.$res->id.'"> <button id="registrarContactoDonate" type="button"  class="btn btn-danger btn-sm"> <i class="fa fa-trash-alt"> </i> </button> </a> </div> </div> </td> </tr> ';
          // $respuesta .= '</a> </div> <div class="col" > <a href="/admin/re-ingresarDonante/'.$res->id.'"> <button id="registrarContactoDonate" type="button"  class="btn btn-success btn-sm"> <i class="fa fa-repeat" aria-hidden="true"></i> </button> </a> </div> </div> </td> </tr> ';
        }
        $respuesta .= '</tbody>';
        return $respuesta;
    }
    //busqueda por tipo de donante Inactivos
    public function showTipoDonanteI($tipo){
        $datos = DB::table('_donante')
                    ->join('tipo_donante', '_donante.idTipoDonante', '=', 'tipo_donante.id')
                    ->join('recurrencia', '_donante.idRecurrencia', '=', 'recurrencia.id')
                    ->join('status', '_donante.status_id', '=', 'status.id')
                    ->select('_donante.id', 'tipo_donante.nombre', '_donante.nombreCompleto1','recurrencia.nombreR')
                    ->where('_donante.idTipoDonante',$tipo)
                    ->where('_donante.status_id','2')
                    ->get();
        $respuesta = '<thead> <tr> <th> Nombre </th> <th> Tipo </th> <th> Recurrencia </th> <th> Acciones </th> </tr> </thead> <tbody>';
        foreach ($datos as $res){
            $respuesta .= '<tr> <td id="jkl">'. $res->nombreCompleto1. '</td>';
            $respuesta .= '<td>'.$res->nombre.'</td>';
            $respuesta .= '<td>'.$res->nombreR.'</td>';
          // $respuesta .= '</a> </div> <div class="col" > <a href="/admin/egresarDonante/'.$res->id.'"> <button id="registrarContactoDonate" type="button"  class="btn btn-danger btn-sm"> <i class="fa fa-trash-alt"> </i> </button> </a> </div> </div> </td> </tr> ';
           $respuesta .= '<td> <div class="col" > <a href="/admin/re-ingresarDonante/'.$res->id.'"> <button id="registrarContactoDonate" type="button"  class="btn btn-success btn-sm"> <i class="fa fa-repeat" aria-hidden="true"></i> </button> </a> </div> </div> </td> </tr> ';


        }
        $respuesta .= '</tbody>';
        return $respuesta;
    }
    //busqueda por input
        public function searchDonor($palabra){
            if($palabra == "allOfEm"){
                $palabra = "";
            }
            $datos = DB::table('_donante')
            ->join('tipo_donante', '_donante.idTipoDonante', '=', 'tipo_donante.id')
            ->join('recurrencia', '_donante.idRecurrencia', '=', 'recurrencia.id')
            ->select('_donante.id', 'tipo_donante.nombre', '_donante.nombreCompleto1','recurrencia.nombreR')
            ->where('_donante.nombreCompleto1', 'like', '%'.$palabra.'%')
            ->orderBy('_donante.id', 'desc')
            ->get();
            $respuesta = '<thead> <tr> <th> Nombre </th> <th> Tipo </th> <th> Recurrencia </th> <th> Acciones </th> </tr> </thead> <tbody>';
            foreach ($datos as $res){
            $respuesta .= '<tr> <td id="jkl">'. $res->nombreCompleto1. '</td>';
            $respuesta .= '<td>'.$res->nombre.'</td>';
            $respuesta .= '<td>'.$res->nombreR.'</td>';
            $respuesta .= '<td> <div class="row"> <div class="col"> <a href="/admin/ViewSpecificDonor/'.$res->id.'"> <button id="verDetalle" type="button" class="btn btn-info btn-sm" > <i class="fa fa-eye"> </i></button> ';
            $respuesta .= '</a> </div> <div class="col" > <a href="/admin/donacion/'.$res->id.'"> <button id="registrarDonacion" type="button" class="btn btn-primary  btn-sm"> <i class="fa fa-plus" aria-hidden="true"></i></button> ';
            $respuesta .= '</a> </div> <div class="col" > <a href="/admin/contactoDonante/'.$res->id.'"> <button id="registrarContactoDonate" type="button"  class="btn btn-primary btn-sm"> <i class="fa fa-address-book" aria-hidden="true"></i> </button> ';
            $respuesta .= '</a> </div> <div class="col" > <a href="/admin/egresarDonante/'.$res->id.'"> <button id="registrarContactoDonate" type="button"  class="btn btn-danger btn-sm"> <i class="fa fa-trash-alt"> </i> </button> </a> </div> </div> </td> </tr> ';
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
        return Donantes::where('id',$id)->get();

    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     * @param  int  $id
     */
    public function showDonaciones($id)
    {
        return Donacion::prueba($id);

    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     * @param  int  $id
     */
    public function showContactos($id)
    {
        return ContactoDonante::prueba($id);

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
    public function update(Request $request, $id)
    {
        $donante = Donantes::find($id);
        $donante->nombreCompleto1 = $request -> nombreCompleto1;
        $donante->fechaCumpleaños1 = $request -> fechaCumpleaños1;
        $donante->RFC1 = $request -> RFC1;
        $donante->correo1 = $request -> correo1;
        $donante->telefono1 = $request -> telefono1;
        $donante->celular1 = $request -> celular1;


        $donante->RazonSocial = $request -> RazonSocial;
        $donante->RFC = $request -> RFC;
        $donante->calle = $request -> calle;
        $donante->noInterior = $request -> noInterior;
        $donante->noExterior = $request -> noExterior;
        $donante->codigoPostal = $request -> codigoPostal;
        $donante->colonia = $request -> colonia;
        $donante->ciudad = $request -> ciudad;
        $donante->municipio = $request -> municipio;
        $donante->estado = $request -> estado;
        $donante->pais = $request -> pais;
        $donante->correo = $request -> correo;

 $donante->status_id = $request -> status_id;
        $donante->fechaEgreso = $request -> fechaEgreso;
        $donante->motivoEgreso = $request -> motivoEgreso;

        $donante->fechaIngreso = $request -> fechaIngreso;
        $donante->motivoIngreso = $request -> motivoIngreso;
        $donante->update();
    }
    public function updateFacturacion(Request $request, $id)
    {
        $donante = Donantes::find($id);

        $donante->RazonSocial = $request -> RazonSocial;
        $donante->RFC = $request -> RFC;
        $donante->calle = $request -> calle;
        $donante->noInterior = $request -> noInterior;
        $donante->noExterior = $request -> noExterior;
        $donante->codigoPostal = $request -> codigoPostal;
        $donante->colonia = $request -> colonia;
        $donante->ciudad = $request -> ciudad;
        $donante->municipio = $request -> municipio;
        $donante->estado = $request -> estado;
        $donante->pais = $request -> pais;
        $donante->correo = $request -> correo;

        
        $donante->update();
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
