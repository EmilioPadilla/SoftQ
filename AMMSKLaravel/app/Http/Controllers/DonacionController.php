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
    public function deleteD($id){
        return DB::table('donacion')
                ->where('donacion.id', $id)
                ->join('tipo_donacion', 'donacion.idTipoDonacion', '=', 'tipo_donacion.id')
                ->join('_donante', 'donacion.idDonante', '=', '_donante.id')
                ->select( 'tipo_donacion.nombre', 'donacion.fechaDonacion','donacion.descripcion','donacion.monto')
                ->get();
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

    public function showTable($donante){
        $datos = DB::table('donacion')
                    ->join('tipo_donacion', 'donacion.idTipoDonacion', '=', 'tipo_donacion.id')
                    ->join('_donante', 'donacion.idDonante', '=', '_donante.id')
                    ->select( 'donacion.id','tipo_donacion.nombre', 'donacion.fechaDonacion','donacion.descripcion','donacion.monto')
                    ->where('donacion.idDonante',$donante)
                    ->orderBy('donacion.id', 'desc')
                    ->get();
        $respuesta = '<thead> <tr> <th> FECHA DE DONACIÓN </th> <th> TIPO </th> <th> MONTO</th> <th> DESCRIPCION </th> <th> ACCIONES </th>  </tr> </thead> <tbody>';
        foreach ($datos as $res){

            $respuesta .= '<tr> <td id="jkl">'. $res->fechaDonacion. '</td>';
            $respuesta .= '<td>'.$res->nombre.'</td>';
            $respuesta .= '<td>'.$res->monto.'</td>';
            $respuesta .= '<td>'.$res->descripcion.'</td>';
            $respuesta .= '<td> <div class="row"> <div class="col"> <a href="/admin/ModificarDonacion/'.$res->id.'"> <button id="verDetalle" type="button" class="btn btn-info btn-sm" > <i class="fa fa-pencil-alt" ></i> </button> ';
            $respuesta .= ' </a></div><div class="col"> <a href="/admin/EliminarDonacion/'.$res->id.'"> <button id="verDetalle" type="button" class="btn btn-danger btn-sm" > <i class="fa fa-trash-alt"> </i></button> </a> </div> </td> </tr>';

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
        /*$datos = DB::table('donacion')
                ->join('tipo_donacion', 'tipo_donacion.id', '=', 'donacion.idTipoDonacion')
                ->select( 'donacion.idTipoDonacion', 'donacion.fechaDonacion','donacion.descripcion','donacion.monto')
                ->where('donacion.id',$id)
                ->get();
        return $datos;*/
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
   
    public function update(Request $request, $id)
    {
        $donacion = Donacion::find($id);
        $donacion->idTipoDonacion= $request-> idTipoDonacion;
        $donacion->fechaDonacion= $request-> fechaDonacion;
        $donacion->descripcion= $request-> descripcion;
        $donacion->monto= $request->monto;
        $donacion->update();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        DB::table('donacion')->where('id',$id)->delete();

    }

    public function financesTable($fecha){
        $total=0;
        $datos = DB::table('donacion')
                    ->join('_donante', '_donante.id','=' ,'donacion.idDonante')
                    ->select('donacion.fechaDonacion', 'donacion.monto', 'donacion.folio', 'donacion.factura','_donante.nombreCompleto1')
                    ->where('donacion.fechaDonacion', 'like', '%'.$fecha.'%' )
                    ->get();
        $respuesta = '<table class="table" id="'.$fecha.'"><thead> <tr> <th> Nombre </th> <th> Fecha </th> <th> Monto </th> <th> Folio </th> <th> Factura </th><th> Total </th> </tr> </thead> <tbody>';
        foreach ($datos as $res){
            $respuesta .= '<tr> <td >'. $res->nombreCompleto1. '</td>';
            $respuesta .= '<td>'.$res->fechaDonacion.'</td>';
            $respuesta .= '<td>'.$res->monto.'</td>';
            $respuesta .= '<td>'.$res->factura. '</td>';
            $respuesta .= '<td>'.$res->folio.'</td> </tr> ';
            $total = $total + $res->monto;
        }
        $respuesta .= '<tr><td></td><td></td><td></td><td></td><td></td><td>'.$total.'</td></tr>';
        $respuesta .= '</tbody> </table>';
        return $respuesta;
    }

    public function getDateDonaciones(){
        $datos = DB::table('donacion')
                    ->select('donacion.fechaDonacion')
                    ->orderBy('donacion.fechaDonacion', 'desc')
                    ->get();
        return $datos;
    }
}