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
                            <Form>
                                <div class="row justify-content-center">
                                    <div class="col-4">
                                        <FormGroup>
                                            <label>Empleado:</label>
                                            <Input type="select" name="select" id="">
                                                <option selected="1">Selecciona el Empleado</option>
                                                <option >Juan Díaz</option>
                                                <option>Eric Torres</option>
                                                <option>Emilio Aguilera</option>
                                            </Input>
                                        </FormGroup>
                                    </div>
                                </div>
                                <div class="row justify-content-center">
                                    <div class="col-4" >
                                        <FormGroup>
                                            <label>Nombre de usuario:</label>
                                            <Input
                                                placeholder="juanP1"
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
                                                placeholder=""
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
                                                placeholder=""
                                                type="password"
                                            
                                            /> 
                                        </FormGroup>
                                    </div>
                                </div>
                                <div class="row justify-content-center">
                                    <div class="col-4">
                                        <FormGroup>
                                            <label>Rol:</label>
                                            <Input type="select" name="select" id="">
                                                <option selected="1">Selecciona el rol</option>
                                                <option >General</option>
                                                <option>Enfermero/a</option>
                                                <option>Administrativo/a</option>
                                            </Input>
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