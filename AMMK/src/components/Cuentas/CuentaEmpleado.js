import React from "react";
import {FormGroup, Form, Input, Button} from "reactstrap"


export class CuentasEmpleados extends React.Component{
    
    render(){
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
                                            <Form.Control type="password"  />
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

export default CuentasEmpleados;