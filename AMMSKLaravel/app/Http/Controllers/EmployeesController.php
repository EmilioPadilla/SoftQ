<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
//importing model
use App\Models\Employee;
use Illuminate\Support\Facades\DB;

class EmployeesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // return Employee::all();
        $employees = Employee::where('status_id', '1')->get();

        return response()->json($employees);
        
    }

    /**
     * Display inactive employees.
     *
     * @return \Illuminate\Http\Response
     */
    public function showInactive()
    {

        $employees = Employee::where('status_id', '2')->get();
        
        return response()->json($employees);
        
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
        $employee = new Employee;


        $employee->nombreCompleto = $request -> nombreCompleto;
        $employee->scholarship_id = $request -> scholarship_id;
        $employee->status_id = '1';
        $employee->voluntario = 0;
        $employee->civil_status_id = $request -> civil_status_id;
        $employee->scholarship_id = $request -> scholarship_id;
        $employee->headquarter_id = $request -> headquarter_id;
        $employee->fechaNac = $request -> fechaNac;
        $employee->salarioxhora = $request -> salarioxhora;
        $employee->fechaIngreso = $request -> fechaIngreso;
        $employee->RFC = $request -> RFC;
        $employee->CURP = $request -> CURP;
        $employee->infonavit = $request -> infonavit;
        $employee->calle = $request -> calle;
        $employee->numInterior = $request -> numInterior;
        $employee->numExterior = $request -> numExterior;
        $employee->colonia = $request -> colonia;
        $employee->codigoPostal = $request -> codigoPostal;
        $employee->estado = $request -> estado;
        $employee->ciudad = $request -> ciudad;
        $employee->telefono = $request -> telefono;
        $employee->celular = $request -> celular;
        $employee->correo = $request -> correo;
        $employee->numBeneficiarios = $request -> numBeneficiarios;
        $employee->frecuenciaSalario = $request -> frecuenciaSalario;
        $employee->puesto = $request -> puesto;
        $employee->diasLaborales = $request -> diasLaborales;
        $employee->numSeguroSocial = $request -> numSeguroSocial;

        $employee->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Employee::where('id', $id)->get();
    }

    /**
     * Changes status of employee to inactive
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function exitEmployee(Request $request, $id)
    {
        $employees = Employee::find($id);

        $employees->status_id = $request->status_id;
        $employees->motivoEgreso = $request->motivoEgreso;
        $employees->fechaEgreso = $request->fechaEgreso;
        $employees->update();
    }

    /**
     * Changes status of employee to active
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function reenterEmployee(Request $request, $id)
    {
        $employees = Employee::find($id);

        $employees->status_id = $request->status_id;
        $employees->motivoReingreso = $request->motivoReingreso;
        $employees->fechaReingreso = $request->fechaReingreso;
        $employees->update();
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
     * Display employees according to status value
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function status($id)
    {
        $employees = Employee::where('status_id', '=', $id)->get();
        return response()->json ($employees);
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
        // $request->validate([
        //     'nombreCompleto' => 'required',

        // ]);
        // $employee->nombreCompleto = $request->nombreCompleto();

        // $employee->save();
        
        // return response()->json([
        //     'message' => 'pokemon updated!',
        //     'pokemon' => $employee
        // ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $deleted = Employee::find($id);
        $deleted->delete();

        if ($deleted) {
            return response()->json([
                'message' => 'Employee deleted'
            ]);
        } else {
            return response()->json([
                'message' => 'error'
            ]);
        }
    }
}
