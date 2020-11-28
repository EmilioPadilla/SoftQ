import React, { Component } from 'react';
import ModificaPersonal from "components/Cuentas/ModificaPersonal";
import { FRONT_BASE_URL } from 'index';




export default class ModifyPersonalAc extends Component {

    render(){
        const login = localStorage.getItem("isLoggedIn");
        const idRol = localStorage.getItem("idRol");
        //Redirect in case of wrong role or no login
        if (!login ) {
            window.location = FRONT_BASE_URL+"login";
        }else if(idRol==2){
            window.location = FRONT_BASE_URL+"general/NurseIndex";
        }else if (idRol==1){
            window.location = FRONT_BASE_URL+"admin/Nomina/Nomina";
        }
        return(
            <ModificaPersonal>

            </ModificaPersonal>
        )
    }

}
