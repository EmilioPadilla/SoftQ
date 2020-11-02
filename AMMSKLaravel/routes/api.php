<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::resource('donantes', 'App\Http\Controllers\DonantesController');
// Rutas empleados
Route::resource('employee', 'App\Http\Controllers\EmployeesController');
Route::resource('scholarship', 'App\Http\Controllers\ScholarshipController');

//Rutas cuentas
Route::resource('account', 'App\Http\Controllers\AccountController');
Route::resource('accountRole', 'App\Http\Controllers\Account_RoleController');
Route::get('account/find/{username}', 'App\Http\Controllers\AccountController@showId');
Route::get('account/table/all', 'App\Http\Controllers\AccountController@showTable');
Route::get('account/table/roles/{role}', 'App\Http\Controllers\AccountController@showByRole');
Route::get('account/table/search/{keyWord}', 'App\Http\Controllers\AccountController@searchBar');
Route::get('account/delete/information/{id}', 'App\Http\Controllers\AccountController@deleteInfo');