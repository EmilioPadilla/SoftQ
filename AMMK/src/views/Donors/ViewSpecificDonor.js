import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ViewDonations from 'views/Donors/ViewDonations'
import ViewContacts from 'views/Donors/ViewContacts'

import Form from "react-bootstrap/Form";

// reactstrap components
import { DropdownItem, Input, Row, Table, Col, Alert, Button, Badge } from 'reactstrap';
import SimpleTooltip from "../General/SimpleTooltip";

//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { ResponsiveEmbed } from 'react-bootstrap';

import axios from 'axios';
import Swal from 'sweetalert2';

library.add(fas)

const ViewSpecificDonor = props =>{

    const login = localStorage.getItem("isLoggedIn");
    const idRol = localStorage.getItem("idRol");
    //Redirect in case of wrong role or no login
   /* if (!login ) {
        window.location = "http://localhost:3000/login";
    }else if(idRol==2){
        window.location = "http://localhost:3000/general/NurseIndex";
    }else if (idRol==1){
        window.location = "http://localhost:3000/admin/Nomina/Nomina";
    }*/

    const {id}= props.match.params;
    ax(id);
    localStorage.setItem("idD",id);
 
    return(

        <div className="content">
        <div class="container-fluid">

        <h1 className="title">DETALLE DONANTE</h1>
        <h3 className="title" id="nombreDonante"></h3>

        <Badge color="primary">DATOS GENERALES</Badge>
        <Link to={`/admin/ModificarGeneralDonante/${id}`}><button id="verDetalle" type="button" class="btn btn-info btn-sm" ><i class="fa fa-pencil-alt" ></i> </button></Link>

        <br></br>
        <br></br>
        <Form.Row>
              <Form.Group as={Col} controlId="fechaCumple">
              <p className="font-weight-bold">FECHA DE CUMPLEAÑOS: </p>
                                <p id="fechaCumple"></p>
                  </Form.Group>
                  &nbsp;&nbsp;&nbsp;

                  <Form.Group as={Col}>
                  <p className="font-weight-bold" >RFC:</p>
                                <p id="RFC1"></p>
                  </Form.Group>

                  <Form.Group as={Col}>
                  </Form.Group>
                  </Form.Row>

                  <br></br>
        <br></br>
                  <Form.Row>
              <Form.Group as={Col}>
              <p className="font-weight-bold" >TELEFONO:</p>
                                <p id="tel"></p>
                  </Form.Group>
                  &nbsp;&nbsp;&nbsp;

                  <Form.Group as={Col}>
                  <p className="font-weight-bold">CELULAR:</p>
                                <p id="cel"></p>
                  </Form.Group>

                  <Form.Group as={Col}>
                  <p className="font-weight-bold">CORREO:</p>
                                <p id="correo1"></p>
                  </Form.Group>
                  </Form.Row>
                  

            <br></br>
            <br></br>
            <Badge color="primary">DATOS FACTURACIÓN</Badge>
            <Link to={`/admin/ModificarDFacturacion/${id}`}><button id="verDetalle" type="button" class="btn btn-info btn-sm" ><i class="fa fa-pencil-alt" ></i> </button></Link>

            <br></br>
            <br></br>
        <Form.Row>
              <Form.Group as={Col}>
              <p className="font-weight-bold">RAZÓN SOCIAL:</p>
                                <p id="razonSocial"></p>
                  </Form.Group>
                  &nbsp;&nbsp;&nbsp;

                  <Form.Group as={Col}>
                  <p className="font-weight-bold">RFC:</p>
                                <p id="RFC2"></p>
                  </Form.Group>
                  <Form.Group as={Col}>
                  </Form.Group>
                  </Form.Row>
                  <br></br>
        <br></br>
            
            <Form.Row>
              <Form.Group as={Col}>
              <p className="font-weight-bold">CALLE:</p>
                            <p id="calle"></p>

                  </Form.Group>
                  &nbsp;&nbsp;&nbsp;

                  <Form.Group as={Col}>
                  <p className="font-weight-bold"># Interior:</p>
                            <p id="interior"></p>

                  </Form.Group>

                  <Form.Group as={Col}>
                  <p className="font-weight-bold"># Exterior:</p>
                            <p id="exterior"></p>
                  </Form.Group>
                  </Form.Row>
                  <br></br>
        <br></br>
            
            <Form.Row>
              <Form.Group as={Col}>
              <p className="font-weight-bold">C.P. :</p>
                            <p id="cp"></p>

                  </Form.Group>
                  &nbsp;&nbsp;&nbsp;

                  <Form.Group as={Col}>
                  <p className="font-weight-bold">COLONIA:</p>
                            <p id="colonia"></p>

                  </Form.Group>

                  <Form.Group as={Col}>
                  <p className="font-weight-bold">CIUDAD:</p>
                            <p id="ciudad"></p>
                  </Form.Group>
                  </Form.Row>

                  <br></br>
        <br></br>
            
            <Form.Row>
              <Form.Group as={Col}>
              <p className="font-weight-bold">MUNICIPIO:</p>
                            <p id="municipio"></p>

                  </Form.Group>
                  &nbsp;&nbsp;&nbsp;

                  <Form.Group as={Col}>
                  <p className="font-weight-bold">ESTADO:</p>
                            <p id="estado"></p>

                  </Form.Group>

                  <Form.Group as={Col}>
                  <p className="font-weight-bold">PAÍS:</p>
                            <p id="pais"></p>
                  </Form.Group>
                  </Form.Row>
                  <br></br>
       
                  <Form.Row>
              <Form.Group as={Col}>
              <p className="font-weight-bold">CORREO:</p>
                            <p id="correo"></p>
                  </Form.Group></Form.Row>
                  <br></br>
                  <br></br>

                  <Badge color="primary">CONTACTOS:</Badge>

               <ViewContacts/>


          <br></br>

<Badge color="primary">DONACIONES:</Badge>
<ViewDonations/>

<br></br> 

<div>
                                <Input type="text" id="valorId" style={{display: "none"}}>

                                </Input>
                            </div>

            </div>
        </div>
  

    )

}

function ax(idD){
    axios.get("http://localhost:8000/api/donantes/"+idD)
    .then(function (resp){
      console.log(resp.data);
     document.getElementById("nombreDonante").innerHTML = resp.data[0].nombreCompleto1;
     document.getElementById("fechaCumple").innerHTML = resp.data[0].fechaCumpleaños1;
    document.getElementById("RFC1").innerHTML = resp.data[0].RFC1;
     document.getElementById("correo1").innerHTML = resp.data[0].correo1;
     document.getElementById("tel").innerHTML = resp.data[0].telefono1;
     document.getElementById("cel").innerHTML = resp.data[0].celular1;
     document.getElementById("razonSocial").innerHTML= resp.data[0].RazonSocial;
     document.getElementById("RFC2").innerHTML = resp.data[0].RFC;
     document.getElementById("calle").innerHTML = resp.data[0].calle;
     document.getElementById("interior").innerHTML = resp.data[0].noInterior;
     document.getElementById("exterior").innerHTML = resp.data[0].noExterior;
     document.getElementById("cp").innerHTML = resp.data[0].codigoPostal;
     document.getElementById("colonia").innerHTML = resp.data[0].colonia;
     document.getElementById("ciudad").innerHTML = resp.data[0].ciudad;
     document.getElementById("municipio").innerHTML = resp.data[0].municipio;
     document.getElementById("estado").innerHTML = resp.data[0].estado;
     document.getElementById("pais").innerHTML = resp.data[0].pais;
     document.getElementById("correo").innerHTML = resp.data[0].correo;
     document.getElementById("valorId").innerHTML = idD;

    } );


    
}


export default ViewSpecificDonor;
