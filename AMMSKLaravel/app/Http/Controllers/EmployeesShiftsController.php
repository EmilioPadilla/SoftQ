<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Models\EmployeesShifts;
use App\Models\Shifts;
use App\Models\EmployeesAttendance;

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

    private function getFutureAttendanceByEmployee($params) {

        $today = Carbon::now()->toDateString();
        $scheduleLimit = Carbon::now()->addMonths(6)->toDateString();

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
        )
        ->join(
            "employees",
            "employees.id",
            "=",
            "employees_shifts.idEmployees"
        )->select(
            "employees_shifts.idEmployees",
            "employees_shifts.idShifts",
            "calendar_table.d AS fecha",
        )->where([
            ["calendar_table.d", ">", $today],
            ["calendar_table.d", "<", $scheduleLimit]
        ])->orderByRaw('calendar_table.dt ASC');

        if ($params->idEmployees != 0) {
            $days->where(
                "employees_shifts.idEmployees", $params->idEmployees
            );
        }

        return $days->get();
    }

    private function getFutureDaysByEmployee($params) {
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
        )
        ->join(
            "employees",
            "employees.id",
            "=",
            "employees_shifts.idEmployees"
        )->select(
            "employees_shifts.idEmployees",
            "employees_shifts.idShifts",
            "employees.nombreCompleto",
            "calendar_table.d",
            "shifts.horaIngreso",
            "shifts.horaSalida"
        )->orderByRaw('calendar_table.dt ASC');

        if (isset($params->startDate) && isset($params->endDate)) {
            $days->whereBetween(
                "calendar_table.dt",
                [$params->startDate, $params->endDate]
            );
        }

        if ($params->idEmployees != 0) {
            $days->where(
                "employees_shifts.idEmployees", $params->idEmployees
            );
        }

        return $days->get();
    }


    /**
     * Future days by employee.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function futureDaysByEmployee(Request $request) {
        $days =  $this->getFutureDaysByEmployee($request);

        return $days;
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

    // /**
    //  * Store a newly created resource in storage.
    //  *
    //  * @param  \Illuminate\Http\Request  $request
    //  * @return \Illuminate\Http\Response
    //  */
    // public function store(Request $request)
    // {
    //     $shift = Shifts::where('nombre', $request->nombreTurno)->first();

    //     $empShift = new EmployeesShifts;
    //     $empShift->idEmployees = $request->idEmployees;
    //     $empShift->idShifts = $shift->id;
    //     $empShift->diaSemana = $request->diaSemana;
    //     $empShift->save();
        
    // }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $today = Carbon::now()->toDateString();

        $empShifts = $request->shifts;
        $empId = null;

        foreach($empShifts as $empShiftDict) {
            $shift = Shifts::where('nombre', $empShiftDict["nombreTurno"])->first();
            $empId = $empShiftDict["idEmployees"];

            $empShift = new EmployeesShifts;
            $empShift->idEmployees = $empId;
            $empShift->idShifts = $shift->id;
            $empShift->diaSemana = $empShiftDict["diaSemana"];
            $empShift->save();
        }

        $app = app();

        $futureDaysParams = $app->make('stdClass');
        $futureDaysParams->idEmployees = $empId;

        $attendanceList = $this->getFutureAttendanceByEmployee($futureDaysParams);

        // Delete obsolete future attendances
        EmployeesAttendance::where([
            ["fecha", ">", $today],
            ["idEmployees", "=", $empId]
        ])->delete();

        // Insert new future attendances
        foreach($attendanceList as $row) {
            $attendance = new EmployeesAttendance;
            $attendance->idEmployees = $row->idEmployees;
            $attendance->idShifts = $row->idShifts;
            $attendance->fecha = $row->fecha;
            $attendance->save();
        }

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
