import React, { Component } from 'react';
import axios from 'axios';
import SimpleTooltip from "../General/SimpleTooltip";
import Swal from "sweetalert2";
import { API_BASE_URL, FRONT_BASE_URL } from 'index';

class SendEmail extends Component {
    
    email(){
        var nombre= localStorage.getItem("name");
        var email= localStorage.getItem("correo");
    
        if(nombre!="" && email!=""){
            axios.get(API_BASE_URL+"send-email/"+nombre+"/"+email)
            .then(function (resp){
        
            })
            Swal.fire("¡Listo!", "El correo ha sido enviado de manera exitosa", "success").then(function () {
              });
        }else{
            Swal.fire(
                "¡Error!",
                "Verifique que el correo sea valido",
                "error"
              );
        }
       

    }
    
    render() { 
        return ( 

            <button id="Email" type="button" onClick={this.email}class="btn btn-info btn-sm" ><i class="fa fa-envelope" ></i>            <SimpleTooltip placement="top" target="Email">Enviar Correo</SimpleTooltip>
            </button>

         );
    }
}
 
export default SendEmail;