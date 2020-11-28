import React from "react";
import logo_li from "./../../assets/img/logo_li.jpg";
import placeholder from "./../../assets/img/placeholder.jpg";
import {FormGroup, Form, Input, Button} from "react-bootstrap"
import axios from 'axios';
import Swal from 'sweetalert2';
import { API_BASE_URL, FRONT_BASE_URL } from 'index';

export class LoginForm extends React.Component{

    

      onSignIn (){
          var user = document.getElementById('loginUsername').value;
          var pass = document.getElementById('loginPassword').value;
        
          const info = {
            username: user,
            password: pass,
        };
        axios.post(API_BASE_URL+"account/login/confirmation/",info)
        .then(function (resp){
          if(resp.data == -1){
            Swal.fire(
                '¡Error!',
                'El username no existe en el sistema',
                'error'
                )
          }else if(resp.data == 0){
            Swal.fire(
                '¡Error!',
                'La contraseña no es correcta',
                'error'
                )
          }else{
            localStorage.setItem("idCuenta",resp.data[0].id);
            localStorage.setItem("idRol",resp.data[0].idRol);
            localStorage.setItem("isLoggedIn", true);
            var idRol = localStorage.getItem("idRol");
            if(idRol==2){
                window.location = FRONT_BASE_URL+"general/NurseIndex";
            }else if (idRol==1){
                window.location = FRONT_BASE_URL+"admin/Nomina/Nomina";
            }else{
                window.location = FRONT_BASE_URL+"general/GeneralIndex";
            }
          }
        } );
        
      }

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
                        <Form >
                            <div class="row">
                                <div class="col">
                                    <FormGroup>
                                        <label>Usuario</label>
                                        <Form.Control type="text" 
                                            id="loginUsername"
                                            />
                                    </FormGroup>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <FormGroup>
                                        <label>Contraseña</label>
                                        <Form.Control type="password"  
                                                id="loginPassword"
                                        />  
                                    </FormGroup>
                                </div>
                            </div>
                            <br/>
                            <br/>
                            
                            <Button className="btn-fill" color="primary" onClick={this.onSignIn} >
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