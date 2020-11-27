<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

//importing model 
use App\Models\WorkedHours;

use DB;

class WorkedHoursController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $worked_hours = WorkedHours::all();
        return response()->json($worked_hours);
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
        $worked_hours = new WorkedHours;

        $worked_hours->employees_id = $request->employees_id;
        $worked_hours->horaIngreso = $request->horaIngreso;

        $worked_hours->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $worked_hours = WorkedHours::find($id);
        return response()->json($worked_hours);
    }

    /**
     * Display the specified resource by employee.
     *
     * @param  int  $idEmployee
     * @return \Illuminate\Http\Response
     */
    public function showByEmployee($employees_id)
    {
        $worked_hours = WorkedHours::join(
            "employees",
            "employees.id",
            "=",
            "worked_hours.employees_id"
        )->join(
            "employees_shifts",
            "employees_shifts.id",
            "=",
            "worked_hours.employees_shifts_id"
        )->join(
            "shifts",
            "shifts.id",
            "=",
            "employees_shifts.idShifts"
        )->selectRaw(
            "worked_hours.id, 
            worked_hours.employees_id, 
            employees.nombreCompleto, 
            worked_hours.horaIngreso, 
            worked_hours.horaSalida, 
            shifts.horaIngreso AS horaIngresoTurno, 
            shifts.horaSalida AS horaSalidaTurno, 
            MINUTE(TIME(worked_hours.horaIngreso) - TIME(shifts.horaIngreso)) AS minutosTarde, 
            employees.salarioxhora, 
            employees.salarioxhora * HOUR(TIME(worked_hours.horaSalida) - TIME(worked_hours.horaIngreso)) AS pago"
        )->take(30);

        if ($employees_id != 0) {
            $worked_hours->where(
                'worked_hours.employees_id', $employees_id
            );
        }
        
        return $worked_hours->get();
    }

    /**
     * Payrolls by employee.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function showPayrolls(Request $request) {
        $days =  DB::table('calendar_table')->join(
            "employees_shifts",
            "employees_shifts.diaSemana",
            "=",
            "calendar_table.weekday_name_spanish"
        )->join(
            "shifts",
            "shifts.id",
            "=",
            "employees_shifts.idShifts"
        )->join(
            "employees",
            "employees.id",
            "=",
            "employees_shifts.idEmployees"
        )->leftJoin(
            "worked_hours",
            function($join){
                $join->on(
                    "worked_hours.employees_shifts_id",
                    "=",
                    "employees_shifts.id"
                );
                $join->on(
                    "worked_hours.horaIngreso",
                    "=",
                    "calendar_table.d"
                );
            }
        )->selectRaw(
            "employees.id,
            employees.nombreCompleto AS nombre,
            CAST(SUM(CASE WHEN worked_hours.horaIngreso IS NULL THEN 0 ELSE 1 END) AS UNSIGNED) AS asistencias,
            MIN(DATE(calendar_table.d)) as inicio,
            MAX(DATE(calendar_table.d)) as fin,
            CAST(SUM(CASE WHEN worked_hours.horaIngreso IS NULL THEN 1 ELSE 0 END) AS UNSIGNED) AS faltas,
            COUNT(MINUTE(TIME(worked_hours.horaIngreso) - TIME(shifts.horaIngreso)) > 10) AS retardos, 
            SUM(employees.salarioxhora * HOUR(TIME(worked_hours.horaSalida) - TIME(worked_hours.horaIngreso))) AS pago"
            )->whereBetween(
                "calendar_table.d",
                [$request->startDate, $request->endDate]
            )->groupByRaw(
                "employees.id, employees.nombreCompleto,
                DAY(calendar_table.d) <= 15"
            )->orderByRaw('MIN(DATE(calendar_table.d)) ASC');

        if ($request->idEmployees != 0) {
            $days->where(
                "employees_shifts.idEmployees", $request->idEmployees
            );
        }

        return $days->get();
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
        
        $worked_hours = WorkedHours::find($id);

        $worked_hours->horaSalida = $request->horaSalida;
        
        $worked_hours->update();

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
