<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vacations; 


class VacationsController extends Controller
{
     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       
        return Vacations::all();
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
        $vacations = new Vacations;

        $vacations->fechaRegistro = $request -> fechaRegistro;
        $vacations->fechaSalida = $request -> fechaSalida;
        $vacations->fechaRegreso = $request -> fechaRegreso;
        $vacations->employees_id = $request -> employees_id;

        $vacations->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Vacations::where('employees_id', $id)->get();;
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
        $vacations = Vacations::find($id);
        $vacations->fechaRegistro = $request -> fechaRegistro;
        $vacations->fechaSalida = $request -> fechaSalida;
        $vacations->fechaRegreso = $request -> fechaRegreso;
        $vacations->employees_id = $request -> employees_id;

        $vacations->update();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Vacations $id)
    {
        $id->delete();
        return response()->json([
            'message' => 'vacation deleted'
        ]);
    }
}
