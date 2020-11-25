<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
//importing model 
use App\Models\WorkedHours; 
use Illuminate\Support\Facades\DB;

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
        $worked_hours = WorkedHours::where('employees_id', $employees_id)->get();
        return response()->json($worked_hours);
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

    public function horasDiarias($idEmployee){

        $datos= DB::table('worked_hours')
        ->select('worked_hours.horaIngreso', 'worked_hours.horaSalida')
        ->where('worked_hours.employees_id',$idEmployee)
        ->get();

        foreach ($datos as $res){
            
            $startTime = Carbon::parse($res->horaIngreso);
            $endTime = Carbon::parse($res->horaSalida);

            $totalDuration = $endTime->diff($startTime)->format('%H');

        }
        return $totalDuration;
    }
}
