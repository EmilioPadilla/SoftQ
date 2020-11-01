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


Route::apiResource('donantes', 'App\Http\Controllers\DonantesController');
Route::resource('tipodonante', 'App\Http\Controllers\TipoDonanteController');
Route::resource('recurrencia', 'App\Http\Controllers\RecurrenciaController');
Route::resource('tipodonacion', 'App\Http\Controllers\TipoDonacionController');
Route::get('donors/table/all', 'App\Http\Controllers\DonantesController@showTable');
Route::get('donations/table/all', 'App\Http\Controllers\DonacionController@showTable');
Route::get('donors/contact/table/all', 'App\Http\Controllers\ContactoDonanteController@showTable');

Route::resource('donaciones', 'App\Http\Controllers\DonacionController');
Route::resource('contactoDonante', 'App\Http\Controllers\ContactoDonanteController');

Route::resource('account', 'App\Http\Controllers\AccountController');
