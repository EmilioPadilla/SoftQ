<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

//importing model 
use App\Models\Beneficiary; 

class BeneficiaryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $beneficiaries = Beneficiary::with('status', 'headquarter')->get();
        return response()->json($beneficiaries);
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
     * Store a newly created resource in storage. POST
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //validate required data
		$request->validate([
            'nombreCompleto' => 'required',
            'fechaNacimiento' => 'required',
            'fechaIngreso' => 'required',
            'dxMedico' => 'required',
        ]);

        $beneficiary = Beneficiary::create($request->all());
        return response()->json(['message'=> 'Beneficiary created successfully.', 
        'beneficiary' => $beneficiary]);	
    }

    /**
     * Display only one specific beneficiary
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Beneficiary::where('id', $id)->get();
    }

    /**
     * Display beneficiaries according to status value
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function status($id)
    {
        $beneficiaries = Beneficiary::where('status_id', '=', $id)->get();
        return response()->json ($beneficiaries);
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
