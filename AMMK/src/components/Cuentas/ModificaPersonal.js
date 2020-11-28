import React from "react";
import {FormGroup, Form, Input, Button, Alert, } from "reactstrap"
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import { Prompt } from 'react-router'
import { API_BASE_URL, FRONT_BASE_URL } from 'index';


export class ModificaPersonal extends React.Component{
    

    constructor(props) {
        super(props)
        this.state = {
            ogUsername: "",
        }  

        // Setting up functions
        this.datos = this.datos.bind(this);
    }




    datos(){
        var id = localStorage.getItem("idCuenta");

        axios.get(API_BASE_URL+"account/"+id)
          .then(function (resp){
           document.getElementById("usernamePersonal").value = resp.data[0].username;
           document.getElementById("ogUsername").value = resp.data[0].username;
           document.getElementById('spnCirc').style.display = 'none';
           
          } ); 
          
    }

    

    onSubmit(e) {
        e.preventDefault()
        var id = localStorage.getItem("idCuenta");
        var x = document.getElementById("passwordPersonal").value;
        var y = document.getElementById("usernamePersonal").value;
        var w = document.getElementById("confPassPersonal").value;
        var iguales = x.localeCompare(w);
        

        if(x.length < 8 && x.length > 0){
            Swal.fire(
                'ERROR!',
                'La contraseña debe tener al menos 8 caracteres',
                'error'
            )
        }else if (y==""){
            Swal.fire(
                'ERROR!',
                'Verifica que todos los campos obligatorios estén completos',
                'error'
            )
        }else if((iguales==0 && x!="") || y.localeCompare(document.getElementById("ogUsername").value) != 0){
            if (x.match(/[A-Z]/) == null){
                Swal.fire(
                    'ERROR!',
                    'La contraseña debe tener al menos una letra mayúscula',
                    'error'
                )
            }else{
                const cuenta = {
                    username: y,
                    password: x,
                };
                axios.put(API_BASE_URL+'account/'+id, cuenta)
                  .then(resp => {console.log(resp.data)});
                //Buscamos el username que acabamos de registrar
                setTimeout(function() {
                }, (3 * 1000));
                Swal.fire(
                '¡Listo!',
                'Datos guardados',
                'success'
                ).then(function() {
                    window.location = FRONT_BASE_URL+"admin/Cuentas/CuentaPersonal";
                });
            }
         
        }else if (iguales != 0){
            Swal.fire(
                'ERROR!',
                'Las contraseñas no coinciden',
                'error'
            )
        }else if(x==""){
            Swal.fire(
                'Atención!',
                'No hay cambios que guardar',
                'info'
            )
        }
  }



    render(){
        const login = localStorage.getItem("isLoggedIn");
        const idRol = localStorage.getItem("idRol");
        //Redirect in case of wrong role or no login
        if (!login ) {
            window.location = FRONT_BASE_URL+"login";
        }else if(idRol==2){
            window.location = FRONT_BASE_URL+"general/NurseIndex";
        }else if (idRol==1){
            window.location = FRONT_BASE_URL+"admin/Nomina/Nomina";
        }
        this.datos()
        return(
            <div class="content">
                <Prompt
            when={true}
            message="Te encuentras en proceso de edición                                                ¿Estás seguro de querer salir?"
          />
                <div class="container">
                    <div class="row">
                        <div class="col-12" >
                            <h2 align="center" className="title">Modificar Mi Cuenta</h2>
                            <div class="row justify-content-center">
                                <Alert color="primary">Los campos marcados con un asterisco (*) son obligatorios.</Alert>
                            </div>
                            <Form onSubmit={this.onSubmit}>
                                <div class="row justify-content-center">
                                    <div class="col-4" >
                                        <FormGroup>
                                            <label>*Nombre de usuario:</label>
                                            <Input
                                                type="text"
                                                id="usernamePersonal"
                                            /> 
                                        </FormGroup>
                                        <FormGroup style={{display: "none"}}>
                                            <label>Nueva Contraseña:</label>
                                            <Input
                                                id="ogUsername"
                                                type="text"
                                            
                                            /> 
                                        </FormGroup>
                                    </div>
                                </div>
                                <div class="row justify-content-center">
                                    <div class="col-4">
                                        <FormGroup>
                                            <label>Nueva Contraseña:</label>
                                            <Input
                                                id="passwordPersonal"
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
                                                id="confPassPersonal"
                                                type="password"
                                            
                                            /> 
                                        </FormGroup>
                                    </div>
                                </div>
                                <div class="row justify-content-center">
                                    <div class="col-1">
                                        <div class="spinner-border" role="status" id="spnCirc" align="center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                </div>
                                <br/>
                                <div class="row justify-content-center">
                                    <div class="col-4" align="center">
                                    <Link to="/admin/Cuentas/principal">
                                            <Button className="btn-fill" color="primary" >
                                                Regresar
                                            </Button>
                                    </Link>
                                    </div>
                                    <div class="col-4" align="center">
                                        <Button className="btn-fill" color="success" type="submit">
                                            Guardar Cambios
                                        </Button>
                                    </div>
                                </div>
                                
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ModificaPersonal;