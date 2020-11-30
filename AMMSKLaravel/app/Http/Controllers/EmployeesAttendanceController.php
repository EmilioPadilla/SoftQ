<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Models\EmployeesAttendance;

class EmployeesAttendanceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Payrolls by employee.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function showByDate(Request $request) {
        $shifts = EmployeesAttendance::join(
            "shifts",
            "shifts.id",
            "=",
            "employees_attendance.idShifts"
        )->select(
            "shifts.id AS idShifts",
            "shifts.nombre AS shiftName",
            "shifts.horaIngreso",
            "shifts.horaSalida",
            "employees_attendance.fecha"
        )->where(
            "employees_attendance.fecha", "=", $request->fecha
        );

        if ($request->idEmployees != 0) {
            $shifts->where(
                "employees_attendance.idEmployees", $request->idEmployees
            );
        }

        return $shifts->get();
    }

    /**
     * Payrolls by employee.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function showPayrolls(Request $request) {

        $today = Carbon::now()->toDateString();

        $days = EmployeesAttendance::join(
            "employees",
            "employees.id",
            "=",
            "employees_attendance.idEmployees"
        )->join(
            "shifts",
            "shifts.id",
            "=",
            "employees_attendance.idShifts"
        )->selectRaw(
            "employees.id AS employeeId,
            employees.nombreCompleto AS nombre,
            CAST(SUM(CASE WHEN employees_attendance.horaIngreso IS NULL THEN 0 ELSE 1 END) AS UNSIGNED) AS asistencias,
            CASE WHEN DAY(MIN(employees_attendance.fecha)) <= 15 THEN 
            DATE_FORMAT(MIN(employees_attendance.fecha), '%Y-%m-01') ELSE 
            DATE_FORMAT(MIN(employees_attendance.fecha), '%Y-%m-16') END 
            as inicio,
            CASE WHEN DAY(MAX(employees_attendance.fecha)) <= 15 THEN 
            DATE_FORMAT(MIN(employees_attendance.fecha), '%Y-%m-1') ELSE 
            LAST_DAY(MAX(employees_attendance.fecha)) END 
            as fin,
            CAST(SUM(CASE WHEN employees_attendance.horaIngreso IS NULL THEN 1 ELSE 0 END) AS UNSIGNED) AS faltas,
            COUNT(MINUTE(TIME(employees_attendance.horaIngreso) - TIME(shifts.horaIngreso)) > 10) AS retardos,
            SUM(employees.salarioxhora * HOUR(TIME(employees_attendance.horaSalida) - TIME(employees_attendance.horaIngreso))) AS pago"
        )->where(
            "employees_attendance.fecha", "<=", $today
        )->groupByRaw(
            "employees.id, employees.nombreCompleto,
            YEAR(employees_attendance.fecha), MONTH(employees_attendance.fecha), DAY(employees_attendance.fecha) <= 15"
        )->orderByRaw('MIN(employees_attendance.fecha) DESC, employees.nombreCompleto');

        if ($request->idEmployees != 0) {
            $days->where(
                "employees_attendance.idEmployees", $request->idEmployees
            );
        }

        return $days->get();
    }

    /**
     * Display the specified resource by employee.
     *
     * @param  int  $idEmployee
     * @return \Illuminate\Http\Response
     */
    public function showByEmployee($employees_id)
    {

        $today = Carbon::now()->toDateString();

        $worked_hours = EmployeesAttendance::join(
            "employees",
            "employees.id",
            "=",
            "employees_attendance.idEmployees"
        )->join(
            "shifts",
            "shifts.id",
            "=",
            "employees_attendance.idShifts"
        )->selectRaw(
            "employees_attendance.id, 
            employees_attendance.idEmployees, 
            employees_attendance.fecha, 
            employees.nombreCompleto, 
            employees_attendance.horaIngreso, 
            employees_attendance.horaSalida, 
            shifts.horaIngreso AS horaIngresoTurno, 
            shifts.horaSalida AS horaSalidaTurno, 
            MINUTE(TIME(employees_attendance.horaIngreso) - TIME(shifts.horaIngreso)) AS minutosTarde, 
            employees.salarioxhora, 
            employees.salarioxhora * HOUR(TIME(employees_attendance.horaSalida) - TIME(employees_attendance.horaIngreso)) AS pago"
        )->where(
            "employees_attendance.fecha", "<=", $today
        )->take(30);

        if ($employees_id != 0) {
            $worked_hours->where(
                'employees_attendance.idEmployees', $employees_id
            );
        }
        
        return $worked_hours->get();
    }

    /**
     * Update by employee, shift and date.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function registerArrival(Request $request)
    {
        $closestShift = EmployeesAttendance::join(
            "shifts",
            "shifts.id",
            "=",
            "employees_attendance.idShifts"
        )->where([
            ['idEmployees', '=', $request->idEmployees],
            ['fecha', '=', $request->fecha],
        ])->selectRaw(
            "ABS(MINUTE(TIMEDIFF(shifts.horaIngreso, CAST('$request->horaIngreso' AS TIME)))) AS diff, 
            shifts.id"
        )->orderByRaw(
            "ABS(MINUTE(TIMEDIFF(shifts.horaIngreso, CAST('$request->horaIngreso' AS TIME)))) ASC"
        )->first();

        echo $closestShift;

        if (! empty($closestShift)) {

            EmployeesAttendance::where([
                ['idEmployees', '=', $request->idEmployees],
                ['idShifts', '=', $closestShift['id']],
                ['fecha', '=', $request->fecha],
            ])->update([
                'horaIngreso' => $request->horaIngreso
            ]);
        }
    }

    /**
     * Update by employee, shift and date.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function registerExit(Request $request)
    {

        $closestShift = EmployeesAttendance::selectRaw(
            "TIMESTAMPDIFF(MINUTE, employees_attendance.horaIngreso, '$request->horaSalida') AS diff,
            employees_attendance.id,
            employees_attendance.horaIngreso"
        )->where([
            ['idEmployees', '=', $request->idEmployees],
            ['fecha', '=', $request->fecha]
        ])->whereRaw(
            "employees_attendance.horaIngreso IS NOT NULL AND 
            TIMESTAMPDIFF(MINUTE, employees_attendance.horaIngreso, '$request->horaSalida') > 0"
        )->orderByRaw(
            "TIMESTAMPDIFF(MINUTE, employees_attendance.horaIngreso, '$request->horaSalida') ASC"
        )->first();

        echo $closestShift;

        if (! empty($closestShift)) {
            EmployeesAttendance::where([
                ['idEmployees', '=', $request->idEmployees],
                ['id', '=', $closestShift['id']],
                ['fecha', '=', $request->fecha],
            ])->update([
                'horaSalida' => $request->horaSalida
            ]);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
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
