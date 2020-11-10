import React, { Component } from 'react';
import LoginForm from "components/Login/LoginForm";



export default class Login extends Component {

    render(){
        const login = localStorage.getItem("isLoggedIn");
        const idRol = localStorage.getItem("idRol");
        //Redirect in case of wrong role or no login
        if (login) {
         if(idRol==2){
            window.location = "http://localhost:3000/general/NurseIndex";
         }else if (idRol==1){
            window.location = "http://localhost:3000/admin/Nomina/Nomina";
         }else if (idRol==3){
            window.location = "http://localhost:3000/general/GeneralIndex";
         }
        }
        return(
            <LoginForm>

            </LoginForm>
        )
    }

}
