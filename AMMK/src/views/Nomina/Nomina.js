import React, { Component } from 'react';
import {FRONT_BASE_URL } from 'index';

//COMPONENTS
import TablaNomina from "../../components/Nomina/TablaNomina";

export default class Nomina extends Component {
    render() {

        const login = localStorage.getItem("isLoggedIn");
        const idRol = localStorage.getItem("idRol");
        //Redirect in case of wrong role or no login
        if (!login ) {
            this.props.history.push('/login');
        }else if (idRol==3){
            this.props.history.push('/general/GeneralIndex');
        }

        return (
            <div className="content">
                <h1 className="title">MI NÓMINA</h1>
                <TablaNomina/>
            </div>
        )
    }
}
