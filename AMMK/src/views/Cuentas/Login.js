import React, { Component } from 'react';
import LoginForm from "components/Login/LoginForm";
import { API_BASE_URL, FRONT_BASE_URL } from 'index';



export default class Login extends Component {

    render(){
        const login = localStorage.getItem("isLoggedIn");
        const idRol = localStorage.getItem("idRol");
        //Redirect in case of wrong role or no login
        if (login) {
         if(idRol==2){
            window.location = FRONT_BASE_URL+"general/NurseIndex";
         }else if (idRol==1){
            window.location = FRONT_BASE_URL+"admin/Nomina/Nomina";
         }else if (idRol==3){
            window.location = FRONT_BASE_URL+"general/GeneralIndex";
         }
        }
        return(
            <LoginForm>

            </LoginForm>
        )
    }

}
