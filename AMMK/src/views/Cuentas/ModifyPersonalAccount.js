import React, { Component } from 'react';
import ModificaPersonal from "components/Cuentas/ModificaPersonal";



export default class ModifyPersonalAc extends Component {

    render(){
        const login = localStorage.getItem("isLoggedIn");
        if (!login) {
            window.location = "http://localhost:3000/login";
        }
        return(
            <ModificaPersonal>

            </ModificaPersonal>
        )
    }

}
