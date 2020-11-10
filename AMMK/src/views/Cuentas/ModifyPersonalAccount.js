import React, { Component } from 'react';
import ModificaPersonal from "components/Cuentas/ModificaPersonal";



export default class ModifyPersonalAc extends Component {

    render(){
        const login = localStorage.getItem("isLoggedIn");
        const idRol = localStorage.getItem("idRol");
        //Redirect in case of wrong role or no login
        if (!login ) {
            window.location = "http://localhost:3000/login";
        }else if(idRol==2){
            window.location = "http://localhost:3000/general/NurseIndex";
        }else if (idRol==1){
            window.location = "http://localhost:3000/admin/Nomina/Nomina";
        }
        return(
            <ModificaPersonal>

            </ModificaPersonal>
        )
    }

}
