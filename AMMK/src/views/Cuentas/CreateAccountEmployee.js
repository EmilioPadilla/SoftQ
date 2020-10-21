import React from "react";
import {FormGroup, Form, Input, Button} from "react-bootstrap"
import axios from 'axios';
import Swal from 'sweetalert2';

class CreateAccEmp extends React.Component{

    crearSelect(){
        var sel='<option value="NA" disabled selected>Selecciona una opción</option>';
        const num=1;
        axios.get("http://localhost:8000/api/account/")
          .then(function (resp){
            console.log(resp.data);
            //Ciclo for para obtener cada uno de los elementos
            resp.data.forEach(element => {
              sel = sel.concat('<option value="' + element.id + '"> ' + element.username + '</option> ');
            });
            //sel = sel.concat('</Form.Control> </FormGroup>');
            //insertar el select en el html
           document.getElementById("selectEmpleadoPrueba").innerHTML = sel;
          } );
      }


    constructor(props) {
        super(props)
    
        // Setting up functions
        this.onSubmit = this.onSubmit.bind(this);
    
        // Setting up state
        this.state = {
          user: '',
          pass: '',
          idEmp: '',
        }
    }
    


    onSubmit(e) {
        e.preventDefault()
        var x = document.getElementById("passwd").value;
        var y = document.getElementById("username").value;
        var z = document.getElementById("selectEmpleado").value; 
        var w = document.getElementById("confPasswd").value;
        var iguales = x.localeCompare(w);
 
        if(iguales==0){
        var num = 1;
         const cuenta = {
          user: y,
          pass: x,
          idEmp: z,
        };
        axios.post('http://localhost:8000/api/account/', cuenta)
          .then(resp => {console.log(resp.data)});
        // console.log(`Expense successfully created!`);
        // console.log(`Name: ${this.state.name}`);
        // console.log(`Amount: ${this.state.amount}`);
        // console.log(`Description: ${this.state.description}`);
        Swal.fire(
        '¡Listo!',
        'Datos guardados',
        'success'
        )
        this.setState({name: ''})
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
                                                <option value="1">Iván Díaz</option>
                                                <option value="2">Eric Torres</option>
                                                <option value="3">Emilio Aguilera</option>
                                            </Form.Control>   
                                        </FormGroup>
                                    </div>
                                </div>
                                <div class="row justify-content-center">
                                    <div class="col-4" >  
                                    <FormGroup> 
                                        <label>Seleccione un Empleado:</label> 
                                            <Form.Control as="select" id="selectEmpleadoPrueba"> 
                                            
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