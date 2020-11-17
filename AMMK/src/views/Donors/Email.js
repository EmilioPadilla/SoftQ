import React, { Component, createRef } from "react";
import axios from 'axios';
import { FormGroup, Form, Input, Button } from "reactstrap";
import { Link } from "react-router-dom";


class Email extends Component {
 
 
  /*email = React.createRef();
  asunto = React.createRef();
  mensaje = React/createRef();
  
  state = { 
    email:" ",
    asunto: " ",
    mensaje: " "

   };*/
   
  /* comprobarCambios = () =>{
    var email = this.email.current.value;
    var asunto = this.asunto.current.value;
    var mensaje = this.mensaje.current.value;
    this.setState({
        email: email,
        asunto: asunto,
        mensaje: mensaje
    });
   };*/

   constructor(){
     super();
     this.enviarEmail = this.enviarEmail.bind(this);
   }

   async enviarEmail(e) {
     e.preventDefault();
     var email = document.getElementById("email").value;
   var asunto = document.getElementById("asunto").value;
   var mensaje = document.getElementById("mensaje").value;
     //const{ email, asunto, mensaje } = this.state;
     const form = await axios.post("/api/form",{
       email,
       asunto,
       mensaje
     });
   }

  render() { 
    return ( 
      <div>
         <div class="content">
    <div class="container">
        <div class="row">
        <div class="col-12" >
        <form className="formulario" onSubmit={this.enviarEmail}>
          <h1>Enviando Emails en react</h1>
          <div>
            <label htmlFor="email">Email:</label>
            <input 
            type="email"
            name="email"
            id="email"
           // onChange={this.comprobarCambios}
            className="form-control"
           // ref={this.email}
            />
          </div>
          <div>
            <label htmlFor="asunto">Asunto:</label>
              <input 
              id="asunto"
              type="text"
              name="asunto"
             // onChange={this.comprobarCambios}
              className="form-control"
              //ref={this.asunto}
              />
          </div>
          <div>
            <label htmlFor="mensaje">Mensaje:</label>
              <textarea 
              rows="4"
              id="mensaje"
              name="mensaje"
             // onChange={this.comprobarCambios}
              className="form-control"
             // ref={this.mensaje}
              />
          </div>
          <div>
            <br />
            <button type="submit" className="btn btn-primary">
              Enviar email
            </button>
          </div>
        </form>
      </div>
      </div>
      </div>
      </div>
      </div>


     );
  }
}
 
export default Email;