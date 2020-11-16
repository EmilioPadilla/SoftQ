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
        $medicalAppointment = new MedicalAppointment;

        $medicalAppointment->fechaConsulta= $request-> fechaConsulta;
        $medicalAppointment->horaConsulta= $request-> horaConsulta;
        $medicalAppointment->diagnostico= $request-> diagnostico;
        $medicalAppointment->direccion = $request -> direccion;
        $medicalAppointment->hospital = $request -> hospital;
        $medicalAppointment->consultorio = $request -> consultorio;
        $medicalAppointment->specialty_id = $request -> specialty_id;
        $medicalAppointment->comentario = $request -> comentario;
        $medicalAppointment->beneficiary_id = $request -> beneficiary_id;

        $medicalAppointment->save();  
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $medicalAppointment = MedicalAppointment::where('id', $id)->get();
        return response()->json($medicalAppointment);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function forBeneficiary($id)
    {
        $medicalAppointments = MedicalAppointment::with('specialty')
        ->where("beneficiary_id", $id)
        ->orderBy('fechaConsulta', 'desc')
        ->orderBy('horaConsulta', 'desc')
        ->get();

        return $medicalAppointments;
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
        $medicalAppointment = MedicalAppointment::find($id);
        $medicalAppointment->fechaConsulta = $request->fechaConsulta;
        $medicalAppointment->horaConsulta = $request->horaConsulta;
        $medicalAppointment->diagnostico = $request->diagnostico;
        $medicalAppointment->direccion = $request->direccion;
        $medicalAppointment->hospital = $request->hospital;
        $medicalAppointment->consultorio = $request->consultorio;
        $medicalAppointment->specialty_id = $request->specialty_id;
        $medicalAppointment->comentario = $request->comentario;
        $medicalAppointment->update();
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