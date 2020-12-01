import React,{Component} from 'react';
import { Link } from "react-router-dom";

class LinkButtonDel extends Component{
    estado = this.props.estado;
    id = this.props.id;
    lin = "/admin/Cuentas/DelCuentaEmp/" + this.id;

    render(){
        return(
            <Link to={this.lin} > <button id="eliminar" type="button"  class="btn btn-danger btn-sm" data-toggle="tooltip" title="Eliminar"> <i class="fa fa-trash-alt"> </i></button> </Link> 
        )
    }
}
export default LinkButtonDel;