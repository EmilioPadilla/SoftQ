<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
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
        return Employee::all();
        
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

        // $employee->id = $request -> id;
        $employee->nombreCompleto = $request -> nombreCompleto;
        $employee->fechaIngreso = $request -> fechaIngreso;
        $employee->telefono = $request -> telefono;
        $employee->diasLaborales = $request -> diasLaborales;
        $employee->salarioxhora = $request -> salarioxhora;

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
        $request->validate([
            'nombreCompleto' => 'required',

        ]);
        $employee->nombreCompleto = $request->nombreCompleto();

        $employee->save();
        
        return response()->json([
            'message' => 'pokemon updated!',
            'pokemon' => $employee
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
