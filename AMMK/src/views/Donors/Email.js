import React, { Component } from 'react';

 //Requerimos el paquete
 var nodemailer = require('nodemailer');

 //Creamos el objeto de transporte
 var transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
     user: 'bloqueprueba5@gmail.com',
     pass: 'Prueba123'
   }
 });
 
 var mensaje = "Hola desde nodejs...";
 
 var mailOptions = {
   from: 'bloqueprueba5@gmail.com',
   to: 'mfa482@live.com',
   subject: 'Asunto Del Correo',
   text: mensaje
 };
 
 transporter.sendMail(mailOptions, function(error, info){
   if (error) {
     console.log(error);
   } else {
     console.log('Email enviado: ' + info.response);
   }
 });
 class Email extends Component {
     render() { 
         return ( 
<div>
    <p>hola</p>
</div>
          );
     }
 }
  
 export default Email;