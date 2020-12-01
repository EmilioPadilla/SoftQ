import React from "react";
import placeholder from "./../../assets/img/placeholder.jpg";
import {Link} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { API_BASE_URL, FRONT_BASE_URL } from 'index';

import {
    Button,
    Card,
    CardBody,
 
  } from "reactstrap";

class MainAccount extends React.Component{
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
            <div class="content">
                <div class="container">
                    <div class="row">
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                    </div>
                    <div class="row align-items-end">
                        <div class="col-6" align="center">
                         <Card className="card-chart text-center">
                             {/* <CardHeader>
                               <CardTitle tag="h1">
                                 Beneficiarias
                               </CardTitle>
                             </CardHeader> */}
                             <CardBody>
                               <h1>Cuenta Personal</h1>
                               <div className="chart-area" style={{'font-size': '170px'}} onClick={(e) => {
                                          e.preventDefault();
                                          this.props.history.push("admin/Cuentas/CuentaPersonal");
                                        }}>
                                 <FontAwesomeIcon icon={['fas', 'user-circle']} color="#0474ac"/>
                               </div>
                             </CardBody>
                         </Card>
                        </div>
                        <div class="col-6" align="center">
                         <Card className="card-chart text-center">
                            {/* <CardHeader>
                              <CardTitle tag="h1">
                                Beneficiarias
                              </CardTitle>
                            </CardHeader> */}
                            <CardBody>
                              <h1>Cuentas de Empleados</h1>
                              <div className="chart-area" style={{'font-size': '170px'}} onClick={(e) => {
                                          e.preventDefault();
                                          this.props.history.push("admin/Cuentas/PrincipalEmp");
                                        }}>
                                <FontAwesomeIcon icon={['fas', 'users']} color="#0474ac"/>
                              </div>
                            </CardBody>
                         </Card>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainAccount;