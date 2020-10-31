<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\EmployeesShifts;
use App\Models\Shifts;

class EmployeesShiftsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return EmployeesShifts::all();
    }

    /**
     * Filter by employee.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function filterByEmployee(Request $request) {
        $empShifts = EmployeesShifts::join(
            "shifts",
            "shifts.id",
            "=",
            "employees_shifts.idShifts"
        )->select(
            "shifts.id",
            "shifts.nombre",
            "employees_shifts.diaSemana"
        )->where("employees_shifts.idEmployees", $request->idEmployees)
        ->get();
        return $empShifts;
    }

    /**
     * Delete by employee.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function deleteByEmployee(Request $request) {
        $deletedRows = EmployeesShifts::where(
            "idEmployees",
            $request->idEmployees
        )->delete();
        return $deletedRows;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $shift = Shifts::where('nombre', $request->nombreTurno)->first();

        $empShift = new EmployeesShifts;
        $empShift->idEmployees = $request->idEmployees;
        $empShift->idShifts = $shift->id;
        $empShift->diaSemana = $request->diaSemana;
        $empShift->save();
        
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
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
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
