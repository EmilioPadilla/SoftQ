<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

function prueba(){
    $juegos = self::select('titulo.id as titulo_id','videojuego.id as id','titulo.nombre as Titulo','condicion.nombre as Condicion','plataforma.nombre as Plataforma')                       
     ->Where('users.id',$id)                       
     ->join('videojuego','users.id','videojuego.id_usuario')                       
      ->join('titulo','titulo.id','videojuego.id_titulo')                        
      ->join('plataforma','plataforma.id','videojuego.id_plataforma')                
    ->join('condicion','condicion.id','videojuego.id_condicion')                 
        ->get();        
                     
                   return juegos;
}
}