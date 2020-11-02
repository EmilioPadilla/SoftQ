<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ContactoDonante; 
use Illuminate\Support\Facades\DB;
class ContactoDonanteController extends Controller
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
    public function deleteC($id){
        return DB::table('contacto_donante')
                ->where('contacto_donante.id', $id)
                ->select('contacto_donante.id','contacto_donante.nombreCompleto','contacto_donante.fechaCumpleaño','contacto_donante.cargo','contacto_donante.correo1','contacto_donante.telefono1','contacto_donante.celular1')
                ->get();
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
        $contactoD = new ContactoDonante;
        
        $contactoD->idDonante= $request->idDonante;
        $contactoD->nombreCompleto= $request-> nombreCompleto;
        $contactoD->cargo= $request-> cargo;
        $contactoD->fechaCumpleaño= $request-> fechaCumpleaño;
        $contactoD->correo1= $request-> correo1;
        $contactoD->telefono1= $request->telefono1;
        $contactoD->celular1= $request->celular1;


        $contactoD->save();

    }

    public function showTable(){
        $datos = DB::table('contacto_donante')
                    ->select('contacto_donante.id','contacto_donante.nombreCompleto','contacto_donante.fechaCumpleaño','contacto_donante.cargo','contacto_donante.correo1','contacto_donante.telefono1','contacto_donante.celular1')
                    ->get();
        $respuesta = '<thead> <tr> <th> Nombre </th> <th> Cargo </th> <th> Fecha de Cumpleaños </th> <th> Correo </th> <th> Telefono </th> <th> Celular </th> <th>ACCIONES </th></tr> </thead> <tbody>';
        foreach ($datos as $res){
            $respuesta .= '<tr> <td id="jkl">'. $res->nombreCompleto. '</td>';
            $respuesta .= '<td>'.$res->cargo.'</td>';
            $respuesta .= '<td>'.$res->fechaCumpleaño.'</td>';
            $respuesta .= '<td>'.$res->correo1.'</td>';
            $respuesta .= '<td>'.$res->telefono1.'</td>';
            $respuesta .= '<td>'.$res->celular1.'</td>';
            $respuesta .= '<td>  <div class="col"> <a href="/admin/EliminarContactoDonante/'.$res->id.'"> <button id="verDetalle" type="button" class="btn btn-danger btn-sm" > <i class="fa fa-trash-alt"> </i></button> </a> </div> </td> </tr>';

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
        return ContactoDonante::where('id',$id)->get();
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
        DB::table('contacto_donante')->where('id',$id)->delete();

    }
}
