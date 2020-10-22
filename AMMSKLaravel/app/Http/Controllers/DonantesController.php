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
        return Donantes::all();

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

        $donante->nombreCompleto1 = $request -> nombreCompleto1;
        $donante->fechaCumpleaños1 = $request -> fechaCumpleaños1;
        $donante->RFC1 = $request -> RFC1;
        $donante->correo1 = $request -> correo1;
        $donante->telefono1 = $request -> telefono1;
        $donante->celular1 = $request -> celular1;




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
