import React from "react";
import {FormGroup, Form, Input, Button} from "react-bootstrap"
import axios from 'axios';
import Swal from 'sweetalert2';

class CreateAccEmp extends React.Component{

    crearSelect(){
        var sel='<option value="NA" disabled selected>Selecciona una opción</option>';
        const num=1;
        axios.get("http://localhost:8000/api/employee/")
          .then(function (resp){
            console.log(resp.data);
            //Ciclo for para obtener cada uno de los elementos
            resp.data.forEach(element => {
              sel = sel.concat('<option value="' + element.id + '"> ' + element.nombreCompleto + '</option> ');
            });
            //sel = sel.concat('</Form.Control> </FormGroup>');
            //insertar el select en el html
           document.getElementById("selectEmpleado").innerHTML = sel;
          } );
      }


    constructor(props) {
        super(props)
    
        // Setting up functions
        this.onSubmit = this.onSubmit.bind(this);
    
        
    }
    


    onSubmit(e) {
        e.preventDefault()
        var idCuenta = 0;
        var x = document.getElementById("passwd").value;
        var y = document.getElementById("username").value;
        var z = document.getElementById("selectEmpleado").value; 
        var w = document.getElementById("confPasswd").value;
        var v = document.getElementById("selectRol").value;
        var iguales = x.localeCompare(w);
 
        if(iguales==0){
         const cuenta = {
          user: y,
          pass: x,
          idEmp: z,
        };
        axios.post('http://localhost:8000/api/account/', cuenta)
          .then(resp => {console.log(resp.data)});
        //Buscamos el username que acabamos de registrar
        setTimeout(function() {
            axios.get('http://localhost:8000/api/account/find/' + y)
            .then(function (resp){
                console.log(resp.data);
                var idCuenta=(resp.data[0].id);
                //Hacemos el registro en accounts_roles
                const acc_rol = {
                    idRol: v,
                    idAccount: idCuenta,
                };
                axios.post('http://localhost:8000/api/accountRole',acc_rol)
                    .then(function (resp){
                        console.log(resp.data);
                    });   
            });
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
        this.crearSelect();
        return(
            <div class="content">
                <div class="container">
                    <div class="row">
                        <div class="col-12" >
                            <h2 align="center">Registrar Cuenta</h2>
                            <Form onSubmit={this.onSubmit}>
                                <div class="row justify-content-center">
                                    <div class="col-4" >  
                                    <FormGroup> 
                                        <label>Seleccione un Empleado:</label> 
                                            <Form.Control as="select" id="selectEmpleado"> 
                                            
                                            </Form.Control> 
                                    </FormGroup>
                                    </div>
                                </div>
                                <div class="row justify-content-center">
                                    <div class="col-4" >
                                        <FormGroup>
                                            <label>Nombre de usuario:</label>
                                            <Form.Control type="text" placeholder="juanP1" 
                                            id="username"
                                            />
                                            
                                        </FormGroup>
                                    </div>
                                </div>
                                <div class="row justify-content-center">
                                    <div class="col-4">
                                        <FormGroup>
                                            <label>Contraseña:</label>
                                            <Form.Control type="password"  
                                                id="passwd"
                                            /> 
                                        </FormGroup>
                                    </div>
                                </div>
                                <div class="row justify-content-center">
                                    <div class="col-4">
                                        <FormGroup>
                                            <label>Confirmar contraseña:</label>
                                            <Form.Control type="password"  id="confPasswd"/>
                                        </FormGroup>
                                    </div>
                                </div>
                                <div class="row justify-content-center">
                                    <div class="col-4" >
                                        <FormGroup>
                                            <label>Seleccione un Rol:</label>
                                            <Form.Control as="select" id="selectRol">
                                                <option value="1">General</option>
                                                <option value="2">Enfermero</option>
                                                <option value="3">Administrador</option>
                                            </Form.Control>   
                                        </FormGroup>
                                    </div>
                                </div>
                                <br/>
                                <div class="row justify-content-center">
                                    <div class="col-4" align="center">
                                        <Button className="btn-fill" color="info" type="submit">
                                            Registrar
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


export default CreateAccEmp;