import React, { Component } from 'react';
import axios from 'axios';
import SimpleTooltip from "../General/SimpleTooltip";
import Swal from "sweetalert2";

class SendEmail extends Component {
    
    email(){
        var nombre= localStorage.getItem("name");
        var email= localStorage.getItem("correo");
    
        if(nombre!="" && email!=""){
            axios.get("http://localhost:8000/api/send-email/"+nombre+"/"+email)
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

            <button  type="button" onClick={this.email}class="btn btn-info btn-sm" ><i class="fa fa-envelope" ></i>            <SimpleTooltip placement="top" target="verDetalle">Enviar Correo</SimpleTooltip>
            </button>

         );
    }
}
 
export default SendEmail;