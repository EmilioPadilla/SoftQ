<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Account;
use App\Models\Account_Role;
use Illuminate\Support\Facades\DB;

class AccountController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $respuesta = DB::table('employees')
                    ->whereNotIn('id', DB::table('accounts')->select('idEmployee'))
                    ->get();
        return $respuesta;
    }

    public function deleteInfo($id)
    {
        return DB::table('accounts')
                ->where('accounts.id', $id)
                ->join('employees', 'accounts.idEmployee', '=', 'employees.id')
                ->join('accounts_roles','accounts.id','=','accounts_roles.idAccount')
                ->join('roles','accounts_roles.idRol','=','roles.id')
                ->select('roles.nombreRol','employees.nombreCompleto','accounts.username')
                ->get();
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
        //Instanciamos la clase Account
        $account = new Account;
        //Declaramos los datos con los enviado en el request
        $account->username = $request->user;
        $account->password = password_hash($request->pass, PASSWORD_DEFAULT) ;
        $account->idEmployee = $request->idEmp;
        
        DB::beginTransaction();
        try{
            if($account->save()){
                $idCuenta = Account::where('username', $request->user)->get();
                $aC = new Account_Role;
                $aC->idRol = $request->rol;
                $aC->idAccount = $idCuenta[0]->id;
                $aC->save();
                DB::commit();
                return 1;
            }else{
                DB::rollback();
                return 0;
            }
        }
        catch(QueryException $ex){
            DB::rollback();
            return 0;
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
        return Account::where('id', $id)->select('accounts.username')->get();
    }


    public function loginInfo(Request $request)
    {
        $usernameStatus =  Account::where('username', $request->username)->get();

        if(count($usernameStatus)!=0){
            $passwordDb =  DB::table('accounts')
                            ->join('accounts_roles','accounts.id','=','accounts_roles.idAccount')
                            ->where('username', $request->username)
                            ->select('accounts.password', 'accounts.id','accounts_roles.idRol')
                            ->get();
            if(password_verify($request->password,$passwordDb[0]->password )){
                $information = DB::table('accounts')
                                ->join('accounts_roles','accounts.id','=','accounts_roles.idAccount')
                                ->where('username', $request->username)
                                ->select('accounts.id','accounts_roles.idRol')
                                ->get();
                return $information;
            }else{
                return 0; 
            }
        }else{
            return -1;
        }
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

    public function showId($username){
        return Account::where('username', $username)->get();
    }




    public function showByRole($role){
        if ($role != 0){
        $datos = DB::table('accounts')
                    ->join('employees', 'accounts.idEmployee', '=', 'employees.id')
                    ->join('accounts_roles','accounts.id','=','accounts_roles.idAccount')
                    ->join('roles','accounts_roles.idRol','=','roles.id')
                    ->select('accounts.id', 'employees.nombreCompleto', 'roles.nombreRol', 'accounts.username','accounts_roles.idRol')
                    ->where('accounts_roles.idRol', $role)
                    ->orderBy('accounts.id', 'desc')
                    ->get();
        }
        else {
            $datos = DB::table('accounts')
                    ->join('employees', 'accounts.idEmployee', '=', 'employees.id')
                    ->join('accounts_roles','accounts.id','=','accounts_roles.idAccount')
                    ->join('roles','accounts_roles.idRol','=','roles.id')
                    ->select('accounts.id', 'employees.nombreCompleto', 'roles.nombreRol', 'accounts.username','accounts_roles.idRol')
                    ->orderBy('accounts.id', 'desc')
                    ->get();
        }
        $respuesta = '<thead> <tr> <th> Nombre </th> <th> Nombre de Usuario </th> <th> Rol </th> <th> Acciones </th> </tr> </thead> <tbody>';
        foreach ($datos as $res){
            $respuesta .= '<tr> <td id="jkl">'. $res->nombreCompleto. '</td>';
            $respuesta .= '<td>'.$res->username.'</td>';
            $respuesta .= '<td>'.$res->nombreRol.'</td>';
            $respuesta .= '<td> <div class="row"> <div class="col"> <a href="/admin/Cuentas/ModCuentaEmp/'.$res->id.'"> <button id="verDetalle" type="button" class="btn btn-info btn-sm" > <i class="fa fa-pencil-alt"> </i></button> ';
            $respuesta .= '</a> </div> <div class="col" > <a href="/admin/Cuentas/DelCuentaEmp/'.$res->id.'"> <button id="eliminar" type="button"  class="btn btn-danger btn-sm"> <i class="fa fa-trash-alt"> </i></button> </a> </div> </div> </td> </tr> ';
        }
        $respuesta .= '</tbody>';
        return $respuesta;
    }




    public function searchBar($keyWord,$idRol){
        if($keyWord == "allOfEm"){
            $keyWord = "";
        }
        if ($idRol != 0){
            $datos = DB::table('accounts')
                    ->join('employees', 'accounts.idEmployee', '=', 'employees.id')
                    ->join('accounts_roles','accounts.id','=','accounts_roles.idAccount')
                    ->join('roles','accounts_roles.idRol','=','roles.id')
                    ->select('accounts.id', 'employees.nombreCompleto', 'roles.nombreRol', 'accounts.username','accounts_roles.idRol')
                    ->where([['accounts.username', 'like', '%'.$keyWord.'%'],['accounts_roles.idRol',$idRol]])
                    ->orderBy('accounts.id', 'desc')
                    ->get();
        }else{
            $datos = DB::table('accounts')
                    ->join('employees', 'accounts.idEmployee', '=', 'employees.id')
                    ->join('accounts_roles','accounts.id','=','accounts_roles.idAccount')
                    ->join('roles','accounts_roles.idRol','=','roles.id')
                    ->select('accounts.id', 'employees.nombreCompleto', 'roles.nombreRol', 'accounts.username','accounts_roles.idRol')
                    ->where('accounts.username', 'like', '%'.$keyWord.'%' )
                    ->orderBy('accounts.id', 'desc')
                    ->get();
        }
        
        $respuesta = '<thead> <tr> <th> Nombre </th> <th> Nombre de Usuario </th> <th> Rol </th> <th> Acciones </th> </tr> </thead> <tbody>';
        foreach ($datos as $res){
            $respuesta .= '<tr> <td id="jkl">'. $res->nombreCompleto. '</td>';
            $respuesta .= '<td>'.$res->username.'</td>';
            $respuesta .= '<td>'.$res->nombreRol.'</td>';
            $respuesta .= '<td> <div class="row"> <div class="col"> <a href="/admin/Cuentas/ModCuentaEmp/'.$res->id.'"> <button id="verDetalle" type="button" class="btn btn-info btn-sm" > <i class="fa fa-pencil-alt"> </i></button> ';
            $respuesta .= '</a> </div> <div class="col" > <a href="/admin/Cuentas/DelCuentaEmp/'.$res->id.'"> <button id="eliminar" type="button"  class="btn btn-danger btn-sm"> <i class="fa fa-trash-alt"> </i></button> </a> </div> </div> </td> </tr> ';
        }
        $respuesta .= '</tbody>';
        return $respuesta;
    }



    public function showTable(){
        $datos = DB::table('accounts')
                    ->join('employees', 'accounts.idEmployee', '=', 'employees.id')
                    ->join('accounts_roles','accounts.id','=','accounts_roles.idAccount')
                    ->join('roles','accounts_roles.idRol','=','roles.id')
                    ->select('accounts.id', 'employees.nombreCompleto', 'roles.nombreRol', 'accounts.username')
                    ->orderBy('accounts.id', 'desc')
                    ->get();
        $respuesta = '<thead> <tr> <th> Nombre </th> <th> Nombre de Usuario </th> <th> Rol </th> <th> Acciones </th> </tr> </thead> <tbody>';
        foreach ($datos as $res){
            $respuesta .= '<tr> <td id="jkl">'. $res->nombreCompleto. '</td>';
            $respuesta .= '<td>'.$res->username.'</td>';
            $respuesta .= '<td>'.$res->nombreRol.'</td>';
            $respuesta .= '<td> <div class="row"> <div class="col"> <a href="/admin/Cuentas/ModCuentaEmp/'.$res->id.'"> <button id="verDetalle" type="button" class="btn btn-info btn-sm"  data-toggle="tooltip" title="Editar"> <i class="fa fa-pencil-alt"> </i></button> ';
            $respuesta .= '</a> </div> <div class="col" > <a href="/admin/Cuentas/DelCuentaEmp/'.$res->id.'"> <button id="eliminar" type="button"  class="btn btn-danger btn-sm" data-toggle="tooltip" title="Eliminar"> <i class="fa fa-trash-alt"> </i></button> </a> </div> </div> </td> </tr> ';
        }
        $respuesta .= '</tbody>';
        return $respuesta;
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
        $account = Account::find($id);
        $account->username = $request->username;
        if($request->password !=""){
            $account->password = password_hash($request->password, PASSWORD_DEFAULT) ;
        }
        $account->update();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        DB::table('accounts')->where('id',$id)->delete();
    }
}
