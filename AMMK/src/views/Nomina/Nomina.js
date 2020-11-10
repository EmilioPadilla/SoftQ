import React, { Component } from 'react';

//COMPONENTS
import TablaNomina from "../../components/Nomina/TablaNomina";

export default class Nomina extends Component {
    render() {

        const login = localStorage.getItem("isLoggedIn");
        const idRol = localStorage.getItem("idRol");
        //Redirect in case of wrong role or no login
        if (!login ) {
            window.location = "http://localhost:3000/login";
        }else if (idRol==3){
            window.location = "http://localhost:3000/general/GeneralIndex";
        }

        return (
            <div className="content">
                <h1 className="title">MI NÓMINA</h1>
                <TablaNomina/>
            </div>
        )
    }
}
