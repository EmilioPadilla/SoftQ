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

Route::resource('status', 'App\Http\Controllers\StatusController');

Route::resource('headquarters', 'App\Http\Controllers\HeadquarterControlles');

Route::resource('beneficiaries', 'App\Http\Controllers\BeneficiaryController');

Route::resource('treatments', 'App\Http\Controllers\TreatmentController');

Route::resource('medical_appointments', 'App\Http\Controllers\MedicalAppointmentController');
