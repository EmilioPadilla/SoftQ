import React from "react";
import placeholder from "./../../assets/img/placeholder.jpg";
import {Link} from "react-router-dom"
import {Button} from "react-bootstrap"


class MainAccount extends React.Component{
    render(){
        return(
            <div class="content">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-6" align="center">
                            <Link to='/admin/Cuentas/CuentaPersonal'>
                                <Button variant="primary" size="lg">
                                    Cuenta Personal
                                </Button>
                            </Link>
                        </div>
                        <div class="col-6" align="center">
                            <Link to='/admin/Cuentas/CrearCuentaEmp'>
                                <Button variant="primary" size="lg">
                                    Cuenta Empleado
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainAccount;