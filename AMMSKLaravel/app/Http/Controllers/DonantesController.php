<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Donantes; 


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

        //Datos donante gobierno/empresa/fundacion
        $donante->RazonSocial2 = $request -> Razonsocial2;
        $donante->Nombre2 = $request -> Nombre2;
        $donante->calle2 = $request -> calle2;
        $donante->noInterior2 = $request -> noInterior2;
        $donante->noExterior2 = $request -> noExterior2;
        $donante->codigoPostal2 = $request -> codigoPostal2;
        $donante->colonia2 = $request -> colonia2;

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

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
        $request->validate([
            'nombreCompleto1' => 'required',

        ]);
        $donante->nombreCompleto1 = $request->nombreCompleto1();

        $donante->save();
        
        return response()->json([
            'message' => 'pokemon updated!',
            'pokemon' => $donante
        ]);
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
