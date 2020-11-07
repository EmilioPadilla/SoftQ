<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vacations; 

//http://localhost:8000/api/employeeVacations

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
        $Vacations->fechaRegistro= $request-> fechaRegistro;
        $Vacations->employees_id= $request-> employees_id;
        $Vacations->fechaRegreso= $request-> fechaRegreso;
        $Vacations->fechaSalida = $request -> fechaSalida;

        $Vacations->save();  
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
        $request->validate([
            'employees_id' => 'required',
            'fechaRegistro' => 'required',
        ]);

        $Vacations->fechaRegistro = $request->fechaRegistro();
        $Vacations->employees_id = $request->employees_id();
        $Vacations->fechaRegreso = $request->fechaRegreso();
        $Vacations->fechaSalida = $request->fechaSalida();

        $Vacations->save();
        
        return response()->json([
            'message' => 'Vacations updated!',
            'Vacations' => $Vacations
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
        $deleted = Vacations::find($id);
        $deleted->delete();

        if ($deleted) {
            return response()->json([
                'message' => 'Vacation deleted'
            ]);
        } else {
            return response()->json([
                'message' => 'error'
            ]);
        }
    }
}
