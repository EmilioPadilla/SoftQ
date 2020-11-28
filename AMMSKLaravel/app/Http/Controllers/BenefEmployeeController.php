<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

//importing model 
use App\Models\Benef_Employee; 

class BenefEmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $benefEmp = Benef_Employee::all();
        return $benefEmp;
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
        $benefEmp = new Benef_Employee;

        $benefEmp->employees_id = $request->employees_id;
        $benefEmp->kinship_id = $request->kinship_id;
        $benefEmp->porcentaje = $request->porcentaje;
        $benefEmp->nombreCompleto = $request->nombreCompleto;
        $benefEmp->telefono = $request->telefono;
        $benefEmp->direccion = $request->direccion;
        $benefEmp->rfc = $request->rfc;

        $benefEmp->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($employee_id)
    {
        $benefEmp = Benef_Employee::where('employees_id', $employee_id)->get();
        return response()->json($benefEmp);
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
        
        $benefEmp = Benef_Employee::find($id);

        $benefEmp->kinship_id = $request->kinship_id;
        $benefEmp->porcentaje = $request->porcentaje;
        $benefEmp->nombreCompleto = $request->nombreCompleto;
        $benefEmp->telefono = $request->telefono;
        $benefEmp->direccion = $request->direccion;
        $benefEmp->rfc = $request->rfc;
        
        $benefEmp->update();

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $deleted = Benef_Employee::find($id);
        $deleted->delete();

        if ($deleted) {
            return response()->json([
                'message' => 'Beneficiary of employee deleted'
            ]);
        } else {
            return response()->json([
                'message' => 'error'
            ]);
        }
    }
}
