import React from "react";
import placeholder from "./../../assets/img/placeholder.jpg";
import {Link} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    Button,
    Card,
    CardBody,
 
  } from "reactstrap";

class MainAccount extends React.Component{
    render(){
      /*const login = localStorage.getItem("isLoggedIn");
      const idRol = localStorage.getItem("idRol");
      //Redirect in case of wrong role or no login
      if (!login ) {
          window.location = "http://localhost:3000/login";
      }else if(idRol==2){
          window.location = "http://localhost:3000/general/NurseIndex";
      }else if (idRol==1){
          window.location = "http://localhost:3000/admin/Nomina/Nomina";
      }*/
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
                                          window.location.href='/admin/Cuentas/CuentaPersonal';
                                        }}>
                                 <FontAwesomeIcon icon={['fas', 'user-circle']} color="#3388a7"/>
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
                                          window.location.href='/admin/Cuentas/PrincipalEmp';
                                        }}>
                                <FontAwesomeIcon icon={['fas', 'users']} color="#3388a7"/>
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