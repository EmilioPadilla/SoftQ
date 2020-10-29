import React, { Component } from 'react';
import {FormGroup, Form, Input, Button} from "reactstrap"
import axios from 'axios';
import Swal from 'sweetalert2';



export default class ModifyAccountEmp extends Component {
    recuperarInfo(){
        const numero=3;
        axios.get("http://localhost:8000/api/account/"+numero)
          .then(function (resp){
            console.log(resp.data);
           document.getElementById("usernameModify").value = resp.data[0].username;
           document.getElementById("passwordModify").value = resp.data[0].password;
           document.getElementById("confpassModify").value = resp.data[0].password;
          } );
      }

      constructor(props) {
        super(props)
        // Setting up functions
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault()
        var x = document.getElementById("passwordModify").value;
        var y = document.getElementById("usernameModify").value;
        var w = document.getElementById("confpassModify").value;
        var iguales = x.localeCompare(w);
 
        if(iguales==0 && y!="" && x!=""){
        var num = 3;
         const cuenta = {
          username: y,
          password: x,
        };
        axios.put('http://localhost:8000/api/account/'+num, cuenta)
          .then(resp => {console.log(resp.data)});
        Swal.fire(
        '¡Listo!',
        'Datos guardados',
        'success'
        )
        }else{
            Swal.fire(
                'ERROR!',
                'Las contraseñas no coinciden',
                'error'
            )
        }
  }

    render(){
        this.recuperarInfo();
        return(
            <div class="content">
                <div class="container">
                    <div class="row">
                        <div class="col-12" >
                            <h2 align="center">Modificar Cuenta de Empleado</h2>
                            <Form onSubmit={this.onSubmit}>
                                <div class="row justify-content-center">
                                    <div class="col-4" >
                                        <FormGroup>
                                            <label>Nombre de usuario:</label>
                                            <Input
                                                id="usernameModify"
                                                
                                                type="text"
                                            
                                            /> 
                                        </FormGroup>
                                    </div>
                                </div>
                                <div class="row justify-content-center">
                                    <div class="col-4">
                                        <FormGroup>
                                            <label>Contraseña:</label>
                                            <Input
                                                id="passwordModify"
                                                
                                                type="password"
                                            
                                            /> 
                                        </FormGroup>
                                    </div>
                                </div>
                                <div class="row justify-content-center">
                                    <div class="col-4">
                                        <FormGroup>
                                            <label>Confirmar contraseña:</label>
                                            <Input
                                                id="confpassModify"
                                                type="password"
                                            
                                            /> 
                                        </FormGroup>
                                    </div>
                                </div>
                                <br/>
                                <div class="row justify-content-center">
                                    <div class="col-4" align="center">
                                        <Button className="btn-fill" color="info" type="submit">
                                            Guardar
                                        </Button>
                                    </div>
                                </div>
                                
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}