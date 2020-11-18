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
            $benefFile->path = $picture;
                $benefFile->beneficiary_id = $request->input("id");
                $benefFile->comentario = $request->input("comentario");
                $benefFile->categoria = $request->input("categoria");;
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
        $benefFiles = BenefFile::where('beneficiary_id', '=', $id)
        ->orderBy('created_at', 'desc')
        ->get();
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
    public function destroy(BenefFile $benefFile)
    {
        $file = $benefFile->path;
        $route = public_path().'/benef_files/'.$file;
        if($route){
            $benefFile->delete();
            unlink($route);
        } else {
            return response()->json([
                'error'=>'File not exist!']);
        }
        return response()->json([
            'message' => $benefFile
        ]);
    } 

    public function downloadFile(BenefFile $benefFile){

        $file = $benefFile->path;
        $route = public_path().'/benef_files/'.$file;
        return response()->download($route, $benefFile);
    }
}
