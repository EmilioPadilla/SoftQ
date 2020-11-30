import React, { Component } from 'react';
import ModificaPersonal from "components/Cuentas/ModificaPersonal";
import { FRONT_BASE_URL } from 'index';




export default class ModifyPersonalAc extends Component {

    render(){
        const login = localStorage.getItem("isLoggedIn");
        const idRol = localStorage.getItem("idRol");
        //Redirect in case of wrong role or no login
            if (!login ) {
        this.props.history.push('/login');
    }else if(idRol==2){
      this.props.history.push('/general/NurseIndex');
    }else if (idRol==1){
      this.props.history.push('/admin/Nomina/Nomina');
    }
        return(
            <ModificaPersonal>

            </ModificaPersonal>
        )
    }

}
