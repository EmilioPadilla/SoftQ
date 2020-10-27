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
/* EMPIEZA GENERALES */
Route::resource('status', 'App\Http\Controllers\StatusController');

Route::resource('headquarters', 'App\Http\Controllers\HeadquarterController');
/* TERMINA GENERALES */

/* EMPIEZA BENEFICIARIAS */
Route::get('beneficiaries/{id}/status', 'App\Http\Controllers\BeneficiaryController@status');
Route::resource('beneficiaries', 'App\Http\Controllers\BeneficiaryController');

Route::resource('treatments', 'App\Http\Controllers\TreatmentController');

Route::resource('medical_appointments', 'App\Http\Controllers\MedicalAppointmentController');

Route::resource('benef_files', 'App\Http\Controllers\BenefFileController');

Route::resource('specialties', 'App\Http\Controllers\SpecialtyController');

Route::resource('modes', 'App\Http\Controllers\ModeController');
/* TERMINA BENEFICIARIAS */
