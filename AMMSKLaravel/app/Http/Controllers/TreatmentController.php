<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

//importing model 
use App\Models\Treatment; 

class TreatmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $treatments = Treatment::all();
        return response()->json($treatments);
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
        $request->validate([
            'beneficiary_id' => 'required',
            'nombreMed' => 'required',
            'dosis' => 'required',
            'mode_id' => 'required',
            'lapso' => 'required',
            'fechaInicio' => 'required',
            'fechaTermino' => 'required'
        ]);
        $treatment = Treatment::create($request->all());
        return response()->json(['message'=> 'treatment created', 
        'treatment' => $treatment]);
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
    public function update(Request $request, Treatment $treatment)
    {
        $request->validate([
            'nombreMed' => 'required',
            'dosis' => 'required',
            'mode_id' => 'required',
            'lapso' => 'required',
            'fechaInicio' => 'required',
            'fechaTermino' => 'required'
        ]);

        $treatment->nombreMed = $request->nombreMed();
        $treatment->dosis = $request->dosis();
        $treatment->mode_id = $request->mode_id();
        $treatment->lapso = $request->lapso();
        $treatment->fechaInicio = $request->fechaInicio();
        $treatment->fechaTermino = $request->fechaTermino();

        $treatment->save();
        
        return response()->json([
            'message' => 'treatment updated!',
            'treatment' => $treatment
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Treatment $treatment)
    {
        $treatment->delete();
        return response()->json([
            'message' => 'treatment deleted'
        ]);
    }
}
