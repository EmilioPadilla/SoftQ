import React, { Component } from "react";
import { FormGroup,Row,Col,Card, Form, Input, Button } from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Prompt } from 'react-router';
import { Progress, Alert, CardBody, CardHeader } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { API_BASE_URL, FRONT_BASE_URL } from 'index';

const ModificarDF = (props) => {
  const { id } = props.match.params;
  ax(id);
  return (
    <div class="content">
        <Prompt
            when={true}
            message="Te encuentras en proceso de modificación... ¿Estás segur@ de querer salir?"
          />
    <div class="container">
        <div class="row">
            <div class="col-12" >
                <h2 >Modificar Datos de Facturación del Donante</h2>
                <Card>
          <CardHeader>
          <h3 align="center" className="title">Datos Facturación</h3>
          <Alert color="primary">Los campos marcados con un asterisco (*) son obligatorios.</Alert>
          </CardHeader>
          <CardBody>
                <Form autoComplete="off">
                <div class="row">
                        <div class="col-4" >
                            <FormGroup>
                            <label className="font-weight-bold">* RAZÓN SOCIAL: </label>
                            <Input
                                    id="rs"
                                    
                                    type="text"
                                />    
                     </FormGroup>
                        </div>
                        <div class="col-4" >
                            <FormGroup>
                            <label className="font-weight-bold">* RFC: </label>
                            <Input
                                    id="rfc"
                                    
                                    type="date"
                                />    
                     </FormGroup>
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-4">
                            <FormGroup>
                            <label className="font-weight-bold">* CALLE: </label>
                            <Input
                                    id="calle"
                                    
                                    type="text"
                                /> 
                            </FormGroup>
                           
                        </div>
                    
                    
                        <div class="col-4">
                            <FormGroup >
                            <label  className="font-weight-bold">* # INTERIOR: </label>
                            <Input
                                    id="interior"
                                    
                                    type="text"
                                /> 
                            </FormGroup>
                        </div>
                    
                        <div class="col-4">
                            <FormGroup>
                            <label className="font-weight-bold">* # EXTERIOR: </label>
                            <Input
                                    id="exterior"
                                    
                                    type="text"
                                /> 
                            </FormGroup>
                        </div>
                    </div>
                  
                    <div class="row justify-content-center">
                        <div class="col-4">
                            <FormGroup>
                            <label className="font-weight-bold">* CÓDIGO POSTAL: </label>
                            <Input
                                    id="cp"
                                    
                                    type="email"
                                /> 
                            </FormGroup>
                        </div>
                   
                        <div class="col-4">
                            <FormGroup>
                            <label className="font-weight-bold">* COLONIA: </label>
                            <Input
                                    id="colonia"
                                    
                                    type="text"
                                /> 
                            </FormGroup>
                        </div>
                    
                        <div class="col-4">
                            <FormGroup>
                            <label className="font-weight-bold">* CIUDAD: </label>
                            <Input
                                    id="ciudad"
                                    
                                    type="text"
                                /> 
                            </FormGroup>
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-4">
                            <FormGroup>
                            <label className="font-weight-bold">* MUNICIPIO: </label>
                            <Input
                                    id="municipio"
                                    
                                    type="text"
                                /> 
                            </FormGroup>
                        </div>
                    
                        <div class="col-4">
                            <FormGroup>
                            <label className="font-weight-bold">* ESTADO: </label>
                            <Input
                                    id="estado"
                                    
                                    type="text"
                                /> 
                            </FormGroup>
                        </div>
                   
                        <div class="col-4">
                            <FormGroup>
                            <label className="font-weight-bold">* PAÍS: </label>
                            <Input
                                    id="pais"
                                    
                                    type="text"
                                /> 
                            </FormGroup>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-4">
                            <FormGroup>
                            <label>*&nbsp;<FontAwesomeIcon icon={['fas', 'envelope']} />&nbsp; Correo:</label>
                            <Input
                                    id="correo"
                                    
                                    type="text"
                                /> 
                            </FormGroup>
                        </div>
                    </div>
                    <br/>
                    <div class="row justify-content-center">
                        <div class="col-4" align="center">
                        <Link to={`/admin/ViewSpecificDonor/${id}`}>

                                <Button className="btn-fill" color="primary" >
                                    Regresar
                                </Button>
                        </Link>
                        </div>
                        <div class="col-4" align="center">
                                <Button className="btn-fill" color="danger" onClick={modificar}>
                                    Modificar
                                </Button>
                        </div>
                    </div>
                </Form>
                <div>
                    <Input type="text" id="valorId" style={{display: "none"}}>

                    </Input>
                </div>
                </CardBody>
                </Card>

            </div>
        </div>
    </div>
</div>
  );
};

function ax(idC) {
  axios.get(API_BASE_URL+"donantes/" + idC).then(function (resp) {
    console.log(resp.data);
           document.getElementById("rs").value = resp.data[0].RazonSocial;
           document.getElementById("rfc").value = resp.data[0].RFC;
           document.getElementById("calle").value = resp.data[0].calle;
           document.getElementById("interior").value = resp.data[0].noInterior;
           document.getElementById("exterior").value = resp.data[0].noExterior;
           document.getElementById("cp").value = resp.data[0].codigoPostal;
           document.getElementById("colonia").value = resp.data[0].colonia;
           document.getElementById("ciudad").value = resp.data[0].ciudad;
           document.getElementById("municipio").value = resp.data[0].municipio;
           document.getElementById("estado").value = resp.data[0].estado;
           document.getElementById("pais").value = resp.data[0].pais;
           document.getElementById("correo").value = resp.data[0].correo;


           document.getElementById("valorId").value = idC;
  });
}


function modificar() {
    var rsF = document.getElementById("rs").value;
    var  rfcF= document.getElementById("rfc").value;
    var calleF = document.getElementById("calle").value;
    var noIF = document.getElementById("interior").value;
    var noEF = document.getElementById("exterior").value;
    var cpF = document.getElementById("cp").value;
    var colF = document.getElementById("colonia").value;
    var ciudadF = document.getElementById("ciudad").value;
    var muniF = document.getElementById("municipio").value;
    var estadoF = document.getElementById("estado").value;
    var paisFact = document.getElementById("pais").value;
    var correoFact = document.getElementById("correo").value;
    
    var idD=document.getElementById("valorId").value;
  if (rsF!= "" && rfcF != ""&&calleF != ""&&noIF != ""&&noEF != ""&&cpF!= ""&&colF!= ""&&ciudadF!= ""&&muniF!= ""&&estadoF!= ""&&paisFact!= ""&&correoFact!= "") {
    const donante = {
        RazonSocial: rsF,
        RFC: rfcF,
        calle: calleF,
        noInterior: noIF,
        noExterior: noEF,
        codigoPostal: cpF,
        colonia: colF,
        ciudad: ciudadF,
        municipio: muniF,
        estado: estadoF,
        pais: paisFact,
        correo: correoFact,
    
      
      };
    axios
      .put(API_BASE_URL+"donantes/modificarFacturacion/" + idD, donante)
      .then(function (resp) {
        console.log(resp.data);
      });

    Swal.fire("¡Listo!", "Cambios guardados", "success").then(function () {
        window.location = FRONT_BASE_URL+"/admin/ViewSpecificDonor/"+idD;
    });
  } else {
    Swal.fire(
      "¡Error!",
      "Alguno de los campos se encuentra vacio",
      "error"
    );
  }
}

export default ModificarDF;
