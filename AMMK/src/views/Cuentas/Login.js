import React, { Component } from 'react';
import LoginForm from "components/Login/LoginForm";
import { API_BASE_URL } from 'index';
import logo_li from "./../../assets/img/logo_li.jpg";
import placeholder from "./../../assets/img/placeholder.jpg";
import {FormGroup, Form, Input, Button} from "react-bootstrap"
import axios from 'axios';
import Swal from 'sweetalert2';
import { createBrowserHistory } from "history";
import { Redirect } from "react-router-dom";
import {login} from "../../index";


export default class Login extends Component {

    onSignIn (hist){
        var user = document.getElementById('loginUsername').value;
        var pass = document.getElementById('loginPassword').value;
        const info = {
          username: user,
          password: pass,
      };
      axios.post(API_BASE_URL+"account/login/confirmation",info)
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
            hist.push('/general/NurseIndex');
          }else if (idRol==1){
            hist.push('/admin/Nomina/Nomina');
          }else{
            hist.push('/general/GeneralIndex');
          }
        }
      } );


      
    }

    render(){
        const login = localStorage.getItem("isLoggedIn");
        const idRol = localStorage.getItem("idRol");
        //Redirect in case of wrong role or no login
        if (login) {
         if(idRol==2){
            this.props.history.push('/general/NurseIndex');
         }else if (idRol==1){
            this.props.history.push('/admin/Nomina/Nomina');
         }else if (idRol==3){
            this.props.history.push('/general/GeneralIndex');
         }
        }
        
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
                            
                            <Button className="btn-fill" color="primary" onClick={this.onSignIn.bind(this, this.props.history)} >
                                Iniciar Sesión
                            </Button>
                        </Form>
                        </div>
                        <div class="col" align="right">
                            <img src={placeholder}   alt="placeholder"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


}
