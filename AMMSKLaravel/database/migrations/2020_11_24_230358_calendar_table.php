<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CalendarTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('calendar_table', function (Blueprint $table) {
            $table->date('d');
            $table->dateTime('dt');
            $table->boolean('is_weekend');
            $table->unsignedInteger('day');
            $table->unsignedInteger('month');
            $table->unsignedInteger('year');
            $table->unsignedInteger('week');
            $table->unsignedInteger('weekday');

            $table->string('month_name', 16);
            $table->string('weekday_name', 16);
            $table->string('weekday_name_spanish', 16)->default("");

            $table->primary('d');
            $table->index(['year', 'month', 'day'], 'date');
        });

        $start_date = DateTime::createFromFormat('Y-m-d H:i:s', '2020-01-01 00:00:00');
        $end_date   = DateTime::createFromFormat('Y-m-d H:i:s', '2050-31-12 23:59:59');

        $current = clone $start_date;

        while ($current < $end_date) {
            $d            = $current->format('Y-m-d');
            $dt           = $current->format('Y-m-d H:i:s');
            $is_weekend   = in_array($current->format('D'), ['Sat', 'Sun']);
            $day          = $current->format('d');
            $month        = $current->format('n'); // month num
            $year         = $current->format('Y');
            $week         = $current->format('W');
            $weekday      = (int)$current->format('w'); // weekday num
            $month_name   = $current->format('F');
            $weekday_name = $current->format('l');

            DB::table('calendar_table')->insert([
                'd'            => $d,
                'dt'           => $dt,
                'is_weekend'   => $is_weekend,
                'day'          => $day,
                'month'        => $month,
                'year'         => $year,
                'week'         => $week,
                'weekday'      => $weekday,
                'month_name'   => $month_name,
                'weekday_name' => $weekday_name,
            ]);

            $current = $current->modify('+1 day');
        }

        DB::table('calendar_table')->where('weekday_name', 'Monday')
        ->update(['weekday_name_spanish' => 'Lunes']);
        DB::table('calendar_table')->where('weekday_name', 'Tuesday')
        ->update(['weekday_name_spanish' => 'Martes']);
        DB::table('calendar_table')->where('weekday_name', 'Wednesday')
        ->update(['weekday_name_spanish' => 'Miércoles']);
        DB::table('calendar_table')->where('weekday_name', 'Thursday')
        ->update(['weekday_name_spanish' => 'Jueves']);
        DB::table('calendar_table')->where('weekday_name', 'Friday')
        ->update(['weekday_name_spanish' => 'Viernes']);
        DB::table('calendar_table')->where('weekday_name', 'Saturday')
        ->update(['weekday_name_spanish' => 'Sábado']);
        DB::table('calendar_table')->where('weekday_name', 'Sunday')
        ->update(['weekday_name_spanish' => 'Domingo']);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::drop('calendar_table');
    }
}
