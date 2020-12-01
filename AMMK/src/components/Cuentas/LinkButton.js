import React,{Component} from 'react';
import { Link } from "react-router-dom";

class LinkButton extends Component{
    estado = this.props.estado;
    id = this.props.id;
    lin = "/admin/Cuentas/ModCuentaEmp/" + this.id;

    render(){
        return(
            <Link to={this.lin} > <button id="verDetalle" type="button" class="btn btn-info btn-sm"  data-toggle="tooltip" title="Editar"> <i class="fa fa-pencil-alt"> </i></button>
            </Link> 
        )
    }
}
export default LinkButton;