import React, { Component } from "react";
import { FormGroup, Form, Input, Button } from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Prompt } from 'react-router';
import { Progress, Alert, Col, Card, CardBody, CardHeader } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ModifyDonorContact = (props) => {
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
                <h2 >Modificar Contacto Donante</h2>
                <Card>
          <CardHeader>
          <h3 align="center" className="title">Datos Modificación Donante</h3>
          <Alert color="primary">Los campos marcados con un asterisco (*) son obligatorios.</Alert>
          </CardHeader>
          <CardBody>
                <Form autoComplete="off">
                    <div class="row">
                        <div class="col-4" >
                            <FormGroup>
                            <label className="font-weight-bold">* NOMBRE: </label>
                            <Input
                                    id="nombre"
                                    
                                    type="text"
                                />    
                     </FormGroup>
                        </div>
                   
                        <div class="col-4">
                            <FormGroup>
                            <label className="font-weight-bold">* CARGO: </label>
                            <Input
                                    id="cargo"
                                    
                                    type="text"
                                /> 
                            </FormGroup>
                           
                        </div>
                    </div>
                    <div class="row">
                    
                        <div class="col-4">
                            <FormGroup id="monto">
                            <label id="monto" className="font-weight-bold"><FontAwesomeIcon icon={['fas', 'calendar-alt']} />&nbsp;FECHA DE CUMPLEAÑOS: </label>
                            <Input
                                    id="fecha"
                                    
                                    type="date"
                                /> 
                            </FormGroup>
                        </div>
                    
                        <div class="col-4">
                            <FormGroup>
                            <label className="font-weight-bold">*&nbsp;<FontAwesomeIcon icon={['fas', 'envelope']} />&nbsp;CORREO: </label>
                            <Input
                                    id="correo"
                                    
                                    type="text"
                                /> 
                            </FormGroup>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-4">
                            <FormGroup>
                            <label className="font-weight-bold"><FontAwesomeIcon icon={['fas', 'phone-alt']} />&nbsp;TELÉFONO: </label>
                            <Input
                                    id="tel"
                                    
                                    type="text"
                                /> 
                            </FormGroup>
                        </div>
                    
                        <div class="col-4">
                            <FormGroup>
                            <label className="font-weight-bold">*&nbsp;<FontAwesomeIcon icon={['fas', 'mobile-alt']} />&nbsp;CELULAR:</label>
                            <Input
                                    id="cel"
                                    
                                    type="text"
                                /> 
                            </FormGroup>
                        </div>
                    </div>
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
  axios.get("http://localhost:8000/api/contactoDonante/" + idC).then(function (resp) {
    console.log(resp.data);
    document.getElementById("nombre").value = resp.data[0].nombreCompleto;
    document.getElementById("cargo").value = resp.data[0].cargo;
    document.getElementById("fecha").value = resp.data[0].fechaCumpleaño;
    document.getElementById("correo").value = resp.data[0].correo1;
    document.getElementById("tel").value = resp.data[0].telefono1;
    document.getElementById("cel").value = resp.data[0].celular1;

    document.getElementById("valorId").value = idC;
  });
}


function modificar() {
    var nom=document.getElementById("nombre").value ;
    var cargo= document.getElementById("cargo").value ;
    var fecha=document.getElementById("fecha").value ;
   var correo= document.getElementById("correo").value;
    var tel=document.getElementById("tel").value ;
   var cel= document.getElementById("cel").value ;

    var idD= document.getElementById("valorId").value;
  if (nom!= "" && cargo!= ""&&fecha != ""&&correo != ""&&cel!= "") {
    const contacto = {
        nombreCompleto: nom,
        cargo: cargo,
        fechaCumpleaño: fecha,
        correo1:correo,
        telefono1:tel,
        celular1:cel,


      };
    axios
      .put("http://localhost:8000/api/contactoDonante/" + idD, contacto)
      .then(function (resp) {
        console.log(resp.data);
      });

    Swal.fire("¡Listo!", "Cambios guardados", "success").then(function () {
      window.location = "http://localhost:3000/admin/ViewSpecificDonor/"+idD;
    });
  } else {
    Swal.fire(
      "¡Error!",
      "Alguno de los campos se encuentra vacio",
      "error"
    );
  }
}

export default ModifyDonorContact;
