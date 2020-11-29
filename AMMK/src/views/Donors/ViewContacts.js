
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { Row, Table, Col, Button, FormGroup, Input, Label, InputGroup, InputGroupAddon, InputGroupText, Modal} from 'reactstrap';
import { API_BASE_URL, FRONT_BASE_URL } from 'index';

var respuesta = "";
function setValorId(params) {
    
}

class ViewContacts extends Component {
    
    crearTabla(){
        var tabla='<thead> <tr> <th>NOMBRE: </th> <th> CARGO: </th> <th> CUMPLEAÑOS: </th> <th> CORREO:</th> <th> TELEFONO:</th> <th> CELULAR:</th> <th> ACCIONES </th></tr> </thead> <tbody>';
        const num=1;
        axios.get(API_BASE_URL+"donors/contact/table/all/"+localStorage.getItem("idD"))
          .then(function (resp){
            document.getElementById("tablaC").innerHTML = resp.data;
          } );
         // localStorage.clear();

      }    
    
    
    render() { 

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
        this.crearTabla();

        return (
<div className="content">

<Col md="12">
<div style={{
            maxHeight: '400px',
            overflowY: 'auto'
          }}>
              <Table hover id="tablaC">
              </Table>
              </div>

            </Col>
               
            </div>



          );
    }
}
 
export default ViewContacts;