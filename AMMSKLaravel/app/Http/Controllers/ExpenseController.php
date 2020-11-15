<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

//importing model 
use App\Models\Expense; 

class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $expenses = Expense::with('category')->get();
        return response()->json($expenses);
    }

    /**
     * Filter by date.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function filterByDate(Request $request)
    {
        if($request->categoryId != 0 && $request->headquarterId != 0) {
            $expenses = Expense::with('category')->select()
            ->where([
                ["category_id", $request->categoryId],
                ["headquarter_id", $request->headquarterId]
            ])->whereBetween(
                "fecha",
                [$request->startDate, $request->endDate]
            )->get();
        } else if ($request->categoryId != 0 && $request->headquarterId == 0) {
            $expenses = Expense::with('category')->select()
            ->where([
                ["category_id", $request->categoryId]
            ])->whereBetween(
                "fecha",
                [$request->startDate, $request->endDate]
            )->get();
        } else if ($request->categoryId == 0 && $request->headquarterId != 0) {
            $expenses = Expense::with('category')->select()
            ->where([
                ["headquarter_id", $request->headquarterId]
            ])->whereBetween(
                "fecha",
                [$request->startDate, $request->endDate]
            )->get();
        } else {
            $expenses = Expense::with('category')->select()
            ->whereBetween(
                "fecha",
                [$request->startDate, $request->endDate]
            )->get();
        }
        
        return $expenses;
    }

    /**
     * Group by month.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     * 
     * 
     */
    public function groupByMonth(Request $request)
    {
        if($request->categoryId != 0 && $request->headquarterId != 0) {
            $expenses = Expense::selectRaw(
                'YEAR(fecha) as year, MONTH(fecha) as month, COUNT(*) as count, SUM(monto) as total'
            )->where([
                ["category_id", $request->categoryId],
                ["headquarter_id", $request->headquarterId]
            ])->whereBetween(
                "fecha",
                [$request->startDate, $request->endDate]
            )->groupByRaw('YEAR(fecha), MONTH(fecha)')
            ->orderByRaw('YEAR(fecha) DESC, MONTH(fecha) DESC')
            ->get();
        } else if($request->categoryId != 0 && $request->headquarterId == 0) {
            $expenses = Expense::selectRaw(
                'YEAR(fecha) as year, MONTH(fecha) as month, COUNT(*) as count, SUM(monto) as total'
            )->where([
                ["category_id", $request->categoryId]
            ])->whereBetween(
                "fecha",
                [$request->startDate, $request->endDate]
            )->groupByRaw('YEAR(fecha), MONTH(fecha)')
            ->orderByRaw('YEAR(fecha) DESC, MONTH(fecha) DESC')
            ->get();
        } else if($request->categoryId == 0 && $request->headquarterId != 0) {
            $expenses = Expense::selectRaw(
                'YEAR(fecha) as year, MONTH(fecha) as month, COUNT(*) as count, SUM(monto) as total'
            )->where([
                ["headquarter_id", $request->headquarterId]
            ])->whereBetween(
                "fecha",
                [$request->startDate, $request->endDate]
            )->groupByRaw('YEAR(fecha), MONTH(fecha)')
            ->orderByRaw('YEAR(fecha) DESC, MONTH(fecha) DESC')
            ->get();
        } else {
            $expenses = Expense::selectRaw(
                'YEAR(fecha) as year, MONTH(fecha) as month, COUNT(*) as count, SUM(monto) as total'
            )->whereBetween(
                "fecha",
                [$request->startDate, $request->endDate]
            )->groupByRaw('YEAR(fecha), MONTH(fecha)')
            ->orderByRaw('YEAR(fecha) DESC, MONTH(fecha) DESC')
            ->get();
        }
        

        return $expenses;
    }

    /**
     * Group by category.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function groupByCategory(Request $request)
    {
        if($request->categoryId != 0 && $request->headquarterId != 0) {
            $expenses = Expense::join(
                "categories",
                "categories.id",
                "=",
                "expenses.category_id"
            )->selectRaw(
                'categories.nombre, COUNT(*) as count, SUM(monto) as total'
            )->where([
                ["category_id", $request->categoryId],
                ["headquarter_id", $request->headquarterId]
            ])->whereBetween(
                "fecha",
                [$request->startDate, $request->endDate]
            )->groupByRaw('categories.nombre')
            ->orderByRaw('SUM(monto) DESC')
            ->get();
        } else if($request->categoryId != 0 && $request->headquarterId == 0) {
            $expenses = Expense::join(
                "categories",
                "categories.id",
                "=",
                "expenses.category_id"
            )->selectRaw(
                'categories.nombre, COUNT(*) as count, SUM(monto) as total'
            )->where([
                ["category_id", $request->categoryId]
            ])->whereBetween(
                "fecha",
                [$request->startDate, $request->endDate]
            )->groupByRaw('categories.nombre')
            ->orderByRaw('SUM(monto) DESC')
            ->get();
        } else if($request->categoryId == 0 && $request->headquarterId != 0) {
            $expenses = Expense::join(
                "categories",
                "categories.id",
                "=",
                "expenses.category_id"
            )->selectRaw(
                'categories.nombre, COUNT(*) as count, SUM(monto) as total'
            )->where([
                ["headquarter_id", $request->headquarterId]
            ])->whereBetween(
                "fecha",
                [$request->startDate, $request->endDate]
            )->groupByRaw('categories.nombre')
            ->orderByRaw('SUM(monto) DESC')
            ->get();
        } else {
            $expenses = Expense::join(
                "categories",
                "categories.id",
                "=",
                "expenses.category_id"
            )->selectRaw(
                'categories.nombre, COUNT(*) as count, SUM(monto) as total'
            )->whereBetween(
                "fecha",
                [$request->startDate, $request->endDate]
            )->groupByRaw('categories.nombre')
            ->orderByRaw('SUM(monto) DESC')
            ->get();
        }
        

        return $expenses;
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
        $expense = new Expense;

        $expense->category_id= $request-> category_id;
        $expense->headquarter_id= $request-> headquarter_id;
        $expense->fecha= $request-> fecha;
        $expense->pagoA= $request-> pagoA;
        $expense->monto = $request -> monto;
        $expense->descripcion = $request -> descripcion;

        $expense->save(); 
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
    public function destroy(Expense $expense)
    {
        $expense->delete();
        return response()->json([
            'message' => 'expense deleted'
        ]);
    }
}
