import React from "react";
import {FormGroup, Form, Input, Button} from "reactstrap"
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";


export class ModificaPersonal extends React.Component{

    constructor(props) {
        super(props)
    
        // Setting up functions
        this.onSubmit = this.onSubmit.bind(this);
    
        
    }

    datos(){
        var id=17;
        axios.get("http://localhost:8000/api/account/"+id)
          .then(function (resp){
            console.log(resp.data);
           document.getElementById("usernamePersonal").value = resp.data[0].username;
           document.getElementById("passwordPersonal").value = resp.data[0].password;
           document.getElementById("confPassPersonal").value = resp.data[0].password;
          } );
    }

    onSubmit(e) {
        e.preventDefault()
        var id=17;
        var x = document.getElementById("passwordPersonal").value;
        var y = document.getElementById("usernamePersonal").value;
        var w = document.getElementById("confPassPersonal").value;
        var iguales = x.localeCompare(w);
 
        if(iguales==0 && x!="" && y!=""){
         const cuenta = {
          username: y,
          password: x,
        };
        axios.put('http://localhost:8000/api/account/'+id, cuenta)
          .then(resp => {console.log(resp.data)});
        //Buscamos el username que acabamos de registrar
        setTimeout(function() {
        }, (3 * 1000));
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
        this.datos();
        return(
            <div class="content">
                <div class="container">
                    <div class="row">
                        <div class="col-12" >
                            <h2 align="center">Modificar Mi Cuenta</h2>
                            <Form onSubmit={this.onSubmit}>
                                <div class="row justify-content-center">
                                    <div class="col-4" >
                                        <FormGroup>
                                            <label>Nombre de usuario:</label>
                                            <Input
                                                type="text"
                                                id="usernamePersonal"
                                            /> 
                                        </FormGroup>
                                    </div>
                                </div>
                                <div class="row justify-content-center">
                                    <div class="col-4">
                                        <FormGroup>
                                            <label>Contraseña:</label>
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
                                        <Button className="btn-fill" color="primary" type="submit">
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