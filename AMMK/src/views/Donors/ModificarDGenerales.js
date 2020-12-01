import React, { Component } from "react";
import { FormGroup, Form, Input, Button } from "reactstrap";
import axios from "axios";
import { Prompt } from 'react-router';
import { API_BASE_URL, FRONT_BASE_URL } from 'index';

import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Progress, Alert,  Card, CardBody, CardHeader } from "reactstrap";

const ModificarDGenerales = (props) => {
  const { id } = props.match.params;
  ax(id);
  return (
    <div class="content">
      <Prompt
            when={true}
            message="Te encuentras en proceso de modificación...                                                ¿Estás segur@ de querer salir?"
          />
    <div class="container">
        <div class="row">
            <div class="col-12" >
                <h2 align="center">Modificar Datos Generales del Donante</h2>
                <Card>
          <CardHeader>
          <h3 align="center" className="title">Datos Personales Donante</h3>
          <Alert color="primary">Los campos marcados con un asterisco (*) son obligatorios.</Alert>
          </CardHeader>
          <CardBody>
                <Form>
                <div class="row justify-content-center">
                        <div class="col-4" >
                            <FormGroup>
                            <label className="font-weight-bold">* NOMBRE COMPLETO: </label>
                            <Input
                                    id="nombre"
                                    
                                    type="text"
                                />    
                     </FormGroup>
                        </div>
                        <div class="col-4">
                            <FormGroup>
                            <label className="font-weight-bold">* RFC: </label>
                            <Input
                                    id="rfc"
                                    
                                    type="text"
                                /> 
                            </FormGroup>
                           
                        </div>
                    </div>
                    <div class="row justify-content-center">
                    <div class="col-4">

                            <FormGroup>
                            <label className="font-weight-bold">&nbsp;<FontAwesomeIcon icon={['fas', 'calendar-alt']} />&nbsp;FECHA DE CUMPLEAÑOS: </label>
                            <Input
                                    id="fecha"
                                    
                                    type="date"
                                />    
                     </FormGroup>
                     </div>
                        <div class="col-4">
                            <FormGroup>
                            <label className="font-weight-bold">*&nbsp;<FontAwesomeIcon icon={['fas', 'envelope']} />&nbsp; CORREO: </label>
                            <Input
                                    id="correo"
                                    
                                    type="email"
                                /> 
                            </FormGroup>
                        </div>
                    </div>
                  
                    <div class="row justify-content-center">

                        <div class="col-4">
                            <FormGroup >
                            <label className="font-weight-bold"><FontAwesomeIcon icon={['fas', 'phone-alt']} />&nbsp;TELÉFONO:</label>
                            <Input
                                    id="tel"
                                    
                                    type="text"
                                /> 
                            </FormGroup>
                        </div>
                        
                        <div class="col-4">
                            <FormGroup>
                            <label className="font-weight-bold">&nbsp;<FontAwesomeIcon icon={['fas', 'mobile-alt']} />*&nbsp;CELULAR:</label>
                            <Input
                                    id="celular"
                                    
                                    type="text"
                                /> 
                            </FormGroup>
                        </div>
                    </div>
                    <br/>
                    
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
           document.getElementById("nombre").value = resp.data[0].nombreCompleto1;
           document.getElementById("fecha").value = resp.data[0].fechaCumpleaños1;
           document.getElementById("rfc").value = resp.data[0].RFC1;
           document.getElementById("tel").value = resp.data[0].telefono1;
           document.getElementById("celular").value = resp.data[0].celular1;
           document.getElementById("correo").value = resp.data[0].correo1;
           document.getElementById("valorId").value = idC;
  });
}


function modificar() {
            var nom=document.getElementById("nombre").value ;
            var fecha=  document.getElementById("fecha").value ;
            var rfc=document.getElementById("rfc").value ;
            var tel=document.getElementById("tel").value ;
            var cel= document.getElementById("celular").value ;
            var correo=document.getElementById("correo").value ;
    var idD=document.getElementById("valorId").value;
  if (nom!= "" &&rfc != ""&&cel!= ""&&correo!= "") {
    const donante = {
        nombreCompleto1: nom,
        fechaCumpleaños1: fecha,
        RFC1: rfc,
        correo1: correo,
        telefono1: tel,
        celular1: cel,

      };
    axios
      .put(API_BASE_URL+"donantes/" + idD, donante)
      .then(function (resp) {
        console.log(resp.data);
      });

    Swal.fire("¡Listo!", "Cambios guardados", "success").then(function () {
      this.props.history.push("/admin/ViewSpecificDonor/"+idD);
    });
  } else {
    Swal.fire(
      "¡Error!",
      "Alguno de los campos se encuentra vacio",
      "error"
    );
  }
}

export default ModificarDGenerales;
