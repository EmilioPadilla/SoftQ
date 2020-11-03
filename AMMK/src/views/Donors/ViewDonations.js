
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { Row, Table, Col, Button, FormGroup, Input, Label, InputGroup, InputGroupAddon, InputGroupText, Modal} from 'reactstrap';


var respuesta = "";
function setValorId(params) {
    
}
class ViewDonations extends Component {
    
    crearTabla(){
        var tabla='<thead> <tr> <th>FECHA DE DONACIÓN: </th> <th> TIPO DE DONACIÓN: </th> <th> MONTO: </th> <th> DESCRIPCIÓN:</th> <th> ACCIONES </th></tr> </thead> <tbody>';
        const num=1;
        axios.get("http://localhost:8000/api/donations/table/all")
          .then(function (resp){
            respuesta = respuesta.concat(resp.data);
            document.getElementById("tablaD").innerHTML = respuesta;
          } );
      }    
    render() { 
        this.crearTabla();

        return ( 
<div className="content">

<Col md="12">
              <Table hover id="tablaD">
              </Table>
            </Col>
               
            </div>


         );
    }
}
 
export default ViewDonations;