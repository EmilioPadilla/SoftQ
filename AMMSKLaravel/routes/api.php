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




    /*DONANTES Y DONACIONES*/
    Route::resource('donantes', 'App\Http\Controllers\DonantesController');
    Route::apiResource('donantes', 'App\Http\Controllers\DonantesController');
    Route::resource('tipodonante', 'App\Http\Controllers\TipoDonanteController');
    Route::resource('recurrencia', 'App\Http\Controllers\RecurrenciaController');
    Route::resource('tipodonacion', 'App\Http\Controllers\TipoDonacionController');
    Route::get('donors/table/all/{status}/{tipo}', 'App\Http\Controllers\DonantesController@showTable');

    Route::get('donors/tableI/all', 'App\Http\Controllers\DonantesController@showTableI');
    Route::get('donors/tableIT/all/{id}', 'App\Http\Controllers\DonantesController@showTableITipo');
    Route::get('donors/tableAT/all/{id}', 'App\Http\Controllers\DonantesController@showTipoDonanteA');

    Route::get('donations/table/all/{donante}', 'App\Http\Controllers\DonacionController@showTable');
    Route::get('donors/contact/table/all/{donante}', 'App\Http\Controllers\ContactoDonanteController@showTable');
    Route::get('donations/showAll/{id}', 'App\Http\Controllers\DonantesController@showDonaciones');
    Route::get('donorContacts/showAll/{id}', 'App\Http\Controllers\DonantesController@showContactos');
    Route::get('donations/delete/{id}', 'App\Http\Controllers\DonacionController@deleteD');
    Route::get('donorContacts/delete/{id}', 'App\Http\Controllers\ContactoDonanteController@deleteC');
    Route::resource('donaciones', 'App\Http\Controllers\DonacionController');
    Route::resource('contactoDonante', 'App\Http\Controllers\ContactoDonanteController');
    Route::get('donors/table/tipoDonante/{tipo}', 'App\Http\Controllers\DonantesController@showTipoDonante');
    //Route::get('account/find/{username}', 'App\Http\Controllers\AccountController@showId');
    Route::get('donors/table/buscar/{palabra}', 'App\Http\Controllers\DonantesController@searchDonor');
    Route::resource('donantes', 'App\Http\Controllers\DonantesController');
    Route::apiResource('donantes', 'App\Http\Controllers\DonantesController');
    Route::put('donantes/modificarFacturacion/{id}', 'App\Http\Controllers\DonantesController@updateFacturacion');
    Route::put('donantes/modificarEgreso/{id}', 'App\Http\Controllers\DonantesController@updateEgreso');
    Route::put('donantes/modificarReIngreso/{id}', 'App\Http\Controllers\DonantesController@updateReIngreso');

    Route::resource('tipodonante', 'App\Http\Controllers\TipoDonanteController');
    Route::resource('recurrencia', 'App\Http\Controllers\RecurrenciaController');
    Route::resource('tipodonacion', 'App\Http\Controllers\TipoDonacionController');
    Route::get('donors/table/all', 'App\Http\Controllers\DonantesController@showTable');


    Route::get('donations/table/all', 'App\Http\Controllers\DonacionController@showTable');
    Route::get('donors/contact/table/all', 'App\Http\Controllers\ContactoDonanteController@showTable');

    Route::get('donations/showAll/{id}', 'App\Http\Controllers\DonantesController@showDonaciones');
    Route::get('donorContacts/showAll/{id}', 'App\Http\Controllers\DonantesController@showContactos');
    Route::get('donations/delete/{id}', 'App\Http\Controllers\DonacionController@deleteD');
    Route::get('donorContacts/delete/{id}', 'App\Http\Controllers\ContactoDonanteController@deleteC');
    Route::resource('donaciones', 'App\Http\Controllers\DonacionController');
    Route::resource('contactoDonante', 'App\Http\Controllers\ContactoDonanteController');
    Route::get("send-email/{nombre}/{email}", "App\Http\Controllers\EmailController@sendEmailToUser");

    Route::post('donors/filter', 'App\Http\Controllers\BeneficiaryController@filter');

    Route::get('donaciones/table/date/{fecha}', 'App\Http\Controllers\DonacionController@financesTable');
    Route::get('donaciones/table/getdates', 'App\Http\Controllers\DonacionController@getDateDonaciones');

    /*DONANTES Y DONACIONES END*/

// Rutas empleados
Route::resource('employee', 'App\Http\Controllers\EmployeesController');
Route::post('filterEmployee', 'App\Http\Controllers\EmployeesController@filter');
Route::resource('employeeStatus', 'App\Http\Controllers\StatusEmployeeController');
Route::resource('scholarship', 'App\Http\Controllers\ScholarshipController');
Route::resource('status', 'App\Http\Controllers\EmployeesShiftsController');
Route::resource('employeesShifts', 'App\Http\Controllers\EmployeesShiftsController');
Route::resource('employeeJobTitles', 'App\Http\Controllers\JobTitleController');
Route::resource('employeeCivilStatus', 'App\Http\Controllers\CivilStatusController');
Route::resource('employeeVacations', 'App\Http\Controllers\VacationsController');

Route::resource('WorkedHours', 'App\Http\Controllers\WorkedHoursController');
// Route::get('WorkedHours/idEmployee/{employees_id}', 'App\Http\Controllers\WorkedHoursController@showByEmployee');
Route::get('WorkedHours/idEmployee/{employees_id}', 'App\Http\Controllers\EmployeesAttendanceController@showByEmployee');
Route::post('payrolls', 'App\Http\Controllers\EmployeesAttendanceController@showPayrolls');
Route::post('attendanceArrival', 'App\Http\Controllers\EmployeesAttendanceController@registerArrival');
Route::post('attendanceExit', 'App\Http\Controllers\EmployeesAttendanceController@registerExit');
Route::post('shiftsAttendance', 'App\Http\Controllers\EmployeesAttendanceController@showByDate');
Route::get('closestShift/{employees_id}', 'App\Http\Controllers\EmployeesAttendanceController@getClosestShift');

Route::post('employeesShifts/search', 'App\Http\Controllers\EmployeesShiftsController@filterByEmployee');
Route::post('employeesShifts/delete', 'App\Http\Controllers\EmployeesShiftsController@deleteByEmployee');
Route::post('employeesShifts/future', 'App\Http\Controllers\EmployeesShiftsController@futureDaysByEmployee');
Route::get('WorkedHours/horasDiarias/{employees_id}', 'App\Http\Controllers\WorkedHoursController@horasDiarias');

Route::resource('Absences', 'App\Http\Controllers\AbsencesController');

Route::resource('Kinship', 'App\Http\Controllers\KinshipController');

Route::resource('Estados', 'App\Http\Controllers\StatesController');

Route::resource('empBeneficiary', 'App\Http\Controllers\BenefEmployeeController');
Route::resource('employee_files', 'App\Http\Controllers\EmployeeFilesController');
Route::get('employee_files/downloadFile/{id}', 'App\Http\Controllers\EmployeeFilesController@downloadFile');

Route::get('inactiveEmployee', 'App\Http\Controllers\EmployeesController@showInactive');
Route::get('employee/{id}', 'App\Http\Controllers\EmployeesController@show');
Route::get('employeeVacations/{id}', 'App\Http\Controllers\VacationsController@show');
Route::any('employee/reenter/{id}', 'App\Http\Controllers\EmployeesController@reenterEmployee');
Route::any('employee/exit/{id}', 'App\Http\Controllers\EmployeesController@exitEmployee');
Route::put('employee/personal/{id}', 'App\Http\Controllers\EmployeesController@updatePersonal');
Route::put('employee/contact/{id}', 'App\Http\Controllers\EmployeesController@updateContact');
Route::put('employee/employee/{id}', 'App\Http\Controllers\EmployeesController@updateEmployee');


Route::get('employee_files/ingreso/{id}', 'App\Http\Controllers\EmployeeFilesController@showImage');



Route::post('incomes/search', 'App\Http\Controllers\IncomesController@filterByDate');

//Rutas cuentas
Route::resource('account', 'App\Http\Controllers\AccountController');
Route::resource('accountRole', 'App\Http\Controllers\Account_RoleController');
Route::get('account/find/{username}', 'App\Http\Controllers\AccountController@showId');
Route::get('account/table/all', 'App\Http\Controllers\AccountController@showTable');
Route::get('account/table/roles/{role}', 'App\Http\Controllers\AccountController@showByRole');
Route::get('account/table/search/{keyWord}/{idRol}', 'App\Http\Controllers\AccountController@searchBar');
Route::get('account/delete/information/{id}', 'App\Http\Controllers\AccountController@deleteInfo');
Route::post('account/login/confirmation', 'App\Http\Controllers\AccountController@loginInfo');

/* EMPIEZA GENERALES */
Route::resource('status', 'App\Http\Controllers\StatusController');
Route::resource('headquarters', 'App\Http\Controllers\HeadquarterController');
/* TERMINA GENERALES */

/* EMPIEZA BENEFICIARIAS */
Route::post('beneficiaries/filter', 'App\Http\Controllers\BeneficiaryController@filter');
Route::post('beneficiaries/filterActive', 'App\Http\Controllers\BeneficiaryController@filterActive');
Route::get('beneficiaries/getLast', 'App\Http\Controllers\BeneficiaryController@getLast');

Route::post('beneficiaries/{id}/reingresar', 'App\Http\Controllers\BeneficiaryController@reingresar');
Route::resource('beneficiaries', 'App\Http\Controllers\BeneficiaryController');

Route::resource('treatments', 'App\Http\Controllers\TreatmentController');
Route::get('treatments/{id}/med', 'App\Http\Controllers\TreatmentController@forBeneficiary');

Route::resource('medical_appointments', 'App\Http\Controllers\MedicalAppointmentController');
Route::get('medical_appointments/{id}/med', 'App\Http\Controllers\MedicalAppointmentController@forBeneficiary');

Route::resource('beneficiary_files', 'App\Http\Controllers\BeneficiaryFileController');
Route::get('beneficiary_files/downloadFile/{id}', 'App\Http\Controllers\BeneficiaryFileController@downloadFile');
Route::get('beneficiary_files/prescriptions/{id}', 'App\Http\Controllers\BeneficiaryFileController@showP');
Route::get('beneficiary_files/ingreso/{id}', 'App\Http\Controllers\BeneficiaryFileController@showImage');

Route::resource('specialties', 'App\Http\Controllers\SpecialtyController');

Route::resource('file_category', 'App\Http\Controllers\FileCategoryController');

Route::resource('modes', 'App\Http\Controllers\ModeController');
/* TERMINA BENEFICIARIAS */

/* EMPIEZA FINANZAS */
Route::resource('categories', 'App\Http\Controllers\CategoryController');
Route::post('incomes/search', 'App\Http\Controllers\IncomesController@filterByDate');
Route::post('incomes/group', 'App\Http\Controllers\IncomesController@groupByMonth');
Route::post('expenses/search', 'App\Http\Controllers\ExpenseController@filterByDate');
Route::post('expenses/group/month', 'App\Http\Controllers\ExpenseController@groupByMonth');
Route::post('expenses/group/category', 'App\Http\Controllers\ExpenseController@groupByCategory');
Route::get('expenses/table/getdates', 'App\Http\Controllers\ExpenseController@getDateExpenses');
Route::get('expenses/table/date/{fecha}', 'App\Http\Controllers\ExpenseController@expensesTable');
Route::resource('expenses', 'App\Http\Controllers\ExpenseController');
/* TERMINA FINANZAS */
