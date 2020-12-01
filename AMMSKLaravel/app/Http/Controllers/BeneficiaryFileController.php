<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

//importing model 
use App\Models\BeneficiaryFile; 
use App\Models\Beneficiary; 
use Response;

class BeneficiaryFileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $beneficiaryFiles = BeneficiaryFile::all();
        return response()->json($beneficiaryFiles);
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
        //MAX_FILESIZE -> 18 MB -- 18432 KB

        if ($request->validate([
            'file' => 'required|mimes:pdf,jpg,jpeg,png,doc,xls,ppt,docx,xlsx,pptx|max:18432'
        ])){
            if ($request->hasFile('file'))
      {
            $file      = $request->file('file');
            $filename  = $file->getClientOriginalName();
            $extension = $file->getClientOriginalExtension();
            $cat= $request->input("categoria");
            if ($cat === 6) {
               $cat = imagenIngreso;
               $picture   = $cat.'_'.$filename;
            } else if ($cat === 7) {
                $cat = imagenEgreso;
                $picture   = $cat.'_'.$filename;
            } else {
                $picture   = time().'_'.$filename;
            }
            $file->move(public_path('beneficiary_files'), $picture);
            $beneficiaryFile = new BeneficiaryFile;
            $beneficiaryFile->path = $picture;
                $beneficiaryFile->beneficiary_id = $request->input("id");
                $beneficiaryFile->comentario = $request->input("comentario");
                $beneficiaryFile->category_id = $request->input("categoria");
                $beneficiaryFile->save();
                return response()->json('File added succesfully');
      } else
      {
            return response()->json(["message" => "Select file first."]);
      }
        } else {
            return response()->json(["message" => "There has been an error, check size and type of file are valid."]);
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
        $beneficiaryFiles = BeneficiaryFile::with('categoria')
        ->where('beneficiary_id', '=', $id)
        ->where('category_id', '<>', '8')
        ->orderBy('created_at', 'desc')
        ->get();
        return response()->json ($beneficiaryFiles);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showImage($id)
    {
        $beneficiaryFiles = BeneficiaryFile::
        where('beneficiary_id', '=', $id)
        ->where('category_id', '=', '6')
        ->get(['path']);
        return response()->json ($beneficiaryFiles);
    }

        /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showP($id)
    {
        $beneficiaryFiles = BeneficiaryFile::with('categoria')
        ->where('beneficiary_id', '=', $id)
        ->where('category_id', '=', '8')
        ->orderBy('created_at', 'desc')
        ->get();
        return response()->json ($beneficiaryFiles);
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
    public function destroy(BeneficiaryFile $beneficiaryFile)
    {
        $file = $beneficiaryFile->path;
        $route = public_path().'/beneficiary_files/'.$file;
        if($route){
            $beneficiaryFile->delete();
            unlink($route);
        } else {
            return response()->json([
                'error'=>'File not exist!']);
        }
        return response()->json([
            'message' => $beneficiaryFile
        ]);
    } 

    public function downloadFile($id){
        $beneficiaryFile = BeneficiaryFile::where('id', '=', $id)->pluck('path');
        $path1 = str_replace('["', '', $beneficiaryFile);
        $path2 = str_replace('"]', '', $path1);
        $route = public_path().'/beneficiary_files/'.$path2;
        $headers = array('Content-Type: application/pdf',);
        return Response::download($route, $path2, $headers);
    }
}
