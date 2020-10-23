<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

//importing model 
use App\Models\MedicalAppointment; 

//http://127.0.0.1:8000/api/medical_appointments

class MedicalAppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $medicalAppointments = MedicalAppointment::with('specialty')->get();
        return response()->json($medicalAppointments);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $medicalAppointments = MedicalAppointment::all();
        return response()->json($medicalAppointments);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'beneficiary_id' => 'required',
            'fechaConsulta' => 'required',
            'horaConsulta' => 'required',
            'direccion' => 'required',
            'hospital' => 'required',
            'specialty_id' => 'required',
        ]);
        	
        $medicalAppointment = MedicalAppointment::create($request->all());
        return response()->json(['message'=> 'Medical appointment created', 
        'medicalAppointment' => $medicalAppointment]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $medicalAppointment = MedicalAppointment::find($id);
        return response()->json($medicalAppointment);
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
    public function update(Request $request, MedicalAppointment $medicalAppointment)
    {
        $request->validate([
            'beneficiary_id' => 'required',
            'fechaConsulta' => 'required',
            'horaConsulta' => 'required',
            'direccion' => 'required',
            'hospital' => 'required',
            'specialty_id' => 'required',
        ]);

        $medicalAppointment->beneficiary_id = $request->beneficiary_id();
        $medicalAppointment->fechaConsulta = $request->fechaConsulta();
        $medicalAppointment->horaConsulta = $request->horaConsulta();
        $medicalAppointment->diagnostico = $request->diagnostico();
        $medicalAppointment->direccion = $request->direccion();
        $medicalAppointment->hospital = $request->hospital();
        $medicalAppointment->consultorio = $request->consultorio();
        $medicalAppointment->specialty_id = $request->speacialty_id();
        $medicalAppointment->comentario = $request->comentario();

        $medicalAppointment->save();
        
        return response()->json([
            'message' => 'Medical appointment updated!',
            'medicalAppointment' => $medicalAppointment
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(MedicalAppointment $medicalAppointment)
    {
        $medicalAppointment->delete();
        return response()->json([
            'message' => 'medical appointment deleted'
        ]);
    }
}