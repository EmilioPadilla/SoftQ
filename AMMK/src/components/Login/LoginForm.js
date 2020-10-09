import React from "react";
import logo_li from "./../../assets/img/logo_li.jpg";
import placeholder from "./../../assets/img/placeholder.jpg";
import {FormGroup, Form, Input, Button} from "reactstrap"

export class LoginForm extends React.Component{

    render(){
        const mystyle = {
            width: "80%",
            height: "45%"
          };
          
        return(
            <div>
                <div class="container">
                    <div class="row">
                        <div class="col">
                        <img src={logo_li} style={mystyle}  alt="Logo"/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <Form>
                            <div class="row">
                                <div class="col">
                                    <FormGroup>
                                        <label>Usuario</label>
                                        <Input
                                            placeholder=""
                                            type="text"
                                        />    
                                    </FormGroup>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <FormGroup>
                                        <label>Contraseña</label>
                                        <Input
                                            placeholder=""
                                            type="text"
                                        />    
                                    </FormGroup>
                                </div>
                            </div>
                            <br/>
                            <br/>
                            
                            <Button className="btn-fill" color="info" type="submit">
                                Iniciar Sesión
                            </Button>
                        </Form>
                        </div>
                        <div class="col" align="right">
                            <img src={placeholder} /*style={mystyle}*/  alt="placeholder"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default LoginForm;