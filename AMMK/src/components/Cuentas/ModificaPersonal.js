import React from "react";
import {FormGroup, Form, Input, Button} from "reactstrap"

export class ModificaPersonal extends React.Component{
    render(){
        return(
            <div class="content">
                <div class="container">
                    <div class="row">
                        <div class="col-12" >
                            <h2 align="center">Modificar Mi Cuenta</h2>
                            <Form>
                                <div class="row justify-content-center">
                                    <div class="col-4" >
                                        <FormGroup>
                                            <label>Nombre de usuario:</label>
                                            <Input
                                                defaultValue="JuanEmp1"
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
                                                defaultValue="MuySecreto11"
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
                                                defaultValue="MuySecreto11"
                                                placeholder=""
                                                type="password"
                                            
                                            /> 
                                        </FormGroup>
                                    </div>
                                </div>
                                <br/>
                                <div class="row justify-content-center">
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