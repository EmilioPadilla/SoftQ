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
Route::resource('employeeStatus', 'App\Http\Controllers\StatusEmployeeController');
Route::resource('scholarship', 'App\Http\Controllers\ScholarshipController');
Route::resource('status', 'App\Http\Controllers\EmployeesShiftsController');
Route::resource('employeesShifts', 'App\Http\Controllers\EmployeesShiftsController');
Route::resource('employeeJobTitles', 'App\Http\Controllers\JobTitleController');
Route::resource('employeeVacations', 'App\Http\Controllers\VacationsController');
Route::post('employeesShifts/search', 'App\Http\Controllers\EmployeesShiftsController@filterByEmployee');
Route::post('employeesShifts/delete', 'App\Http\Controllers\EmployeesShiftsController@deleteByEmployee');
Route::get('employee/{id}', 'App\Http\Controllers\EmployeesController@show');
Route::get('employeeVacations/{id}', 'App\Http\Controllers\VacationsController@show');
Route::get('employeeFiles/{id}', 'App\Http\Controllers\Employee_FilesController@show');

//Rutas cuentas

Route::apiResource('donantes', 'App\Http\Controllers\DonantesController');
Route::resource('tipodonante', 'App\Http\Controllers\TipoDonanteController');
Route::resource('recurrencia', 'App\Http\Controllers\RecurrenciaController');
Route::resource('tipodonacion', 'App\Http\Controllers\TipoDonacionController');
Route::get('donors/table/all', 'App\Http\Controllers\DonantesController@showTable');
Route::get('donations/table/all', 'App\Http\Controllers\DonacionController@showTable');
Route::get('donors/contact/table/all', 'App\Http\Controllers\ContactoDonanteController@showTable');
Route::get('donations/showAll/{id}', 'App\Http\Controllers\DonantesController@showDonaciones');
Route::get('donorContacts/showAll/{id}', 'App\Http\Controllers\DonantesController@showContactos');

Route::resource('donaciones', 'App\Http\Controllers\DonacionController');
Route::resource('contactoDonante', 'App\Http\Controllers\ContactoDonanteController');

Route::post('incomes/search', 'App\Http\Controllers\IncomesController@filterByDate');

Route::resource('account', 'App\Http\Controllers\AccountController');
Route::resource('accountRole', 'App\Http\Controllers\Account_RoleController');
Route::get('account/find/{username}', 'App\Http\Controllers\AccountController@showId');
Route::get('account/table/all', 'App\Http\Controllers\AccountController@showTable');
Route::get('account/table/roles/{role}', 'App\Http\Controllers\AccountController@showByRole');
Route::get('account/table/search/{keyWord}', 'App\Http\Controllers\AccountController@searchBar');
Route::get('account/delete/information/{id}', 'App\Http\Controllers\AccountController@deleteInfo');

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

/* EMPIEZA FINANZAS */
Route::resource('categories', 'App\Http\Controllers\CategoryController');

Route::resource('expenses', 'App\Http\Controllers\ExpenseController');
/* TERMINA FINANZAS */
