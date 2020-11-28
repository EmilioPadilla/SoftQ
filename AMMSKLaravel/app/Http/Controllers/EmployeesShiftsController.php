<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\EmployeesShifts;
use App\Models\Shifts;

use DB;

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
        )->where("employees_shifts.idEmployees", $request->idEmployees);

        if ($request->diaSemana) {
            $empShifts->where(
                "employees_shifts.diaSemana", $request->diaSemana
            );
        }
        
        return $empShifts->get();
    }


    /**
     * Future days by employee.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function futureDaysByEmployee(Request $request) {
        $days =  DB::table('calendar_table')->join(
            "employees_shifts",
            "employees_shifts.diaSemana",
            "=",
            "calendar_table.weekday_name_spanish"
        )
        ->join(
            "shifts",
            "shifts.id",
            "=",
            "employees_shifts.idShifts"
        )
        ->join(
            "employees",
            "employees.id",
            "=",
            "employees_shifts.idEmployees"
        )
        ->select(
            "employees_shifts.idEmployees",
            "employees_shifts.idShifts",
            "employees.nombreCompleto",
            "calendar_table.d",
            "shifts.horaIngreso",
            "shifts.horaSalida"
        )->whereBetween(
            "calendar_table.dt",
            [$request->startDate, $request->endDate]
        )->orderByRaw('calendar_table.dt ASC');

        if ($request->idEmployees != 0) {
            $days->where(
                "employees_shifts.idEmployees", $request->idEmployees
            );
        }

        return $days->get();
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
