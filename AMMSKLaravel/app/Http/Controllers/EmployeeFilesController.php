<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

//importing model 
use App\Models\EmpFile; 
use Response;

class EmployeeFilesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $EmpFiles = EmpFile::all();
        return response()->json($EmpFiles);
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
            $picture   = time().'-'.$filename;
            $file->move(public_path('employee_files'), $picture);
            $EmpFile = new EmpFile;
            $EmpFile->path = $picture;
                $EmpFile->employees_id = $request->input("id");
                $EmpFile->comentario = $request->input("comentario");
                $EmpFile->categoria = $request->input("categoria");;
                $EmpFile->save();
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
        $EmpFiles = EmpFile::where('employees_id', '=', $id)
        ->orderBy('created_at', 'desc')
        ->get();
        return response()->json ($EmpFiles);
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
        $file = EmpFile::find($id);
        $path = $file->path;
        $route = public_path().'/employee_files/'.$path;
        if($route){
            $file->delete();
            unlink($route);
        } else {
            return response()->json([
                'error'=>'File not exist!']);
        }
        return response()->json([
            'message' => $file
        ]);
    } 

    public function downloadFile($id){
        $EmpFile = EmpFile::where('id', '=', $id)->pluck('path');
        $path1 = str_replace('["', '', $EmpFile);
        $path2 = str_replace('"]', '', $path1);
        $route = public_path().'/employee_files/'.$path2;
        $headers = array('Content-Type: application/pdf',);
        return Response::download($route, $path2, $headers);
    }
}
