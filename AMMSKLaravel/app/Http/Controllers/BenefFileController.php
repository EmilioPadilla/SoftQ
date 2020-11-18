<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

//importing model 
use App\Models\BenefFile; 
use App\Models\Beneficiary; 

class BenefFileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $benefFiles = BenefFile::all();
        return response()->json($benefFiles);
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
      //check file
      if ($request->hasFile('file'))
      {
            $file      = $request->file('file');
            $filename  = $file->getClientOriginalName();
            $extension = $file->getClientOriginalExtension();
            $picture   = time().'-'.$filename;
            //move image to public/img folder
            $file->move(public_path('benef_files'), $picture);
            $benefFile = new BenefFile;
            $benefFile->path = 'benef_files/' . $picture;
                //$benefFile->comentario= $request-> comentario;
                $benefFile->beneficiary_id=8;
                $benefFile->comentario='';
                $benefFile->categoria='ingreso';
                $benefFile->save();
                return response()->json('File added succesfully');
      } 
      else
      {
            return response()->json(["message" => "Select image first."]);
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
        $benefFiles = BenefFile::where('beneficiary_id', '=', $id)->get();
        return response()->json ($benefFiles);
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
        $file = BenefFile::find($request->id);
        $file_path = $file->file_path;
        if(file_exists($file_path))
   {        
      unlink($file_path);
      BenefFile::destroy($request->id);
   }
   return response()->json('File deleted succesfully');
    }
    
}
