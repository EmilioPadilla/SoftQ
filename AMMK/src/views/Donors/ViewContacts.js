

import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { Row, Table, Col, Button, FormGroup, Input, Label, InputGroup, InputGroupAddon, InputGroupText, Modal} from 'reactstrap';

var respuesta = "";
function setValorId(params) {
    
}

class ViewContacts extends Component {
    
    crearTabla(){
        var tabla='<thead> <tr> <th>NOMBRE: </th> <th> CARGO: </th> <th> CUMPLEAÑOS: </th> <th> CORREO:</th> <th> TELEFONO:</th> <th> CELULAR:</th> <th> ACCIONES </th></tr> </thead> <tbody>';
        const num=1;
        axios.get("http://localhost:8000/api/donors/contact/table/all")
          .then(function (resp){
            respuesta = respuesta.concat(resp.data);
            document.getElementById("tablaC").innerHTML = respuesta;
          } );
      }    
    
    
    render() { 
        this.crearTabla();

        return (
<div className="content">

<Col md="12">
              <Table hover id="tablaC">
              </Table>
            </Col>
               
            </div>



          );
    }
}
 
export default ViewContacts;