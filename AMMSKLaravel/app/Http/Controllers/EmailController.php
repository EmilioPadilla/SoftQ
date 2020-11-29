<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\MyEmail;

class EmailController extends Controller
{
    
     // ------------- [ Send email ] --------------------
     public function sendEmailToUser($nombre, $correo) {
        
        
        $to_email = $correo;

        Mail::to($to_email)->send(new MyEmail($nombre));

        return "<p> Your E-mail has been sent successfully. </p>";

    }
}
