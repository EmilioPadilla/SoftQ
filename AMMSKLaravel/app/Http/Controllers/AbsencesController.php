<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

//importing model 
use App\Models\Absences; 

class AbsencesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $absences = Absences::join(
            "employees",
            "employees.id",
            "=",
            "absences.employees_id"
        )->select(
            "absences.id",
            "absences.motivoAusencia",
            "absences.urlArchivo",
            "absences.fecha",
            "employees.nombreCompleto"
        )->get();
        // $absences = Absences::all();
        return $absences;
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
        $absences = new Absences;

        $absences->employees_id = $request->employees_id;
        $absences->motivoAusencia = $request->motivoAusencia;
        $absences->urlArchivo = $request->urlArchivo;
        $absences->fecha = $request->fecha;

        $absences->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($employee_id)
    {
        $absences = Absences::where('employees_id', $employee_id)->get();
        return response()->json($absences);
    }

    /**
     * Display the specified resource by employee.
     *
     * @param  int  $idEmployee
     * @return \Illuminate\Http\Response
     */
    public function showByEmployee($employee_id)
    {
        $absences = Absences::where('employees_id', $employee_id)->get();
        return response()->json($absences);
    }

        /**
     * Display the specified resource by employee.
     *
     * @param  int  $idEmployee
     * @return \Illuminate\Http\Response
     */
    public function showWithEmployee($employee_id)
    {
        $absences = Absences::join(
            "employees",
            "employees.id",
            "=",
            "absences.employees_id"
        )->select(
            "absences.id",
            "absences.motivoAusencia",
            "absences.urlArchivo",
            "absences.fecha",
            "employees.nombreCompleto"
        )->where("absences.employees_id", "employees.id")->get();

        return response()->json($absences);
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
        
        $absences = Absences::find($id);

        $absences->horaSalida = $request->horaSalida;
        
        $absences->update();

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
