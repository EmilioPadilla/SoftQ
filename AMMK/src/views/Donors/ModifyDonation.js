import React, { Component } from "react";
import { FormGroup, Form, Input, Button } from "reactstrap";
import axios from "axios";
import { Prompt } from 'react-router';
import { API_BASE_URL, FRONT_BASE_URL } from 'index';

import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Progress, Alert, Col, Card, CardBody, CardHeader } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ModifyDonation = (props) => {
  const { id } = props.match.params;
  ax(id);
  return (
      
    <div class="content">
       <Prompt
            when={true}
            message="Te encuentras en proceso de modificación...¿Estás segur@ de querer salir?"
          />
                <div class="container">
                    <div class="row">
                        <div class="col-12" ></div>
                <h2>Modificar Donación</h2>
                <Card>
          <CardHeader>
  <h3 align="center" className="title">Datos Donación {localStorage.getItem("donacion")}</h3>

          <Alert color="primary">Los campos marcados con un asterisco (*) son obligatorios.</Alert>
          </CardHeader>
          <CardBody>
                <Form autoComplete="off">
                    <div class="row justify-content-center">
                        <div class="col-4 justify-content-center" >
                            <FormGroup>
                            <label className="font-weight-bold">*&nbsp;<FontAwesomeIcon icon={['fas', 'calendar-alt']} />&nbsp;FECHA EN QUE SE REALIZÓ: </label>
                            <Input
                                    id="fecha"
                                    
                                    type="date"
                                />    
                     </FormGroup>
                        </div>

                       
                    </div>
                    <div class="row justify-content-center">
                    
                        <div class="col-4">
                            <FormGroup >
                            <label className="font-weight-bold">*&nbsp;<FontAwesomeIcon icon={['fas', 'money-bill']} />&nbsp;MONTO: </label>
                            <Input
                                    id="monto"
                                    
                                    type="text"
                                /> 
                            </FormGroup>
                        </div>
                    
                        <div class="col-4">
                            <FormGroup>
                            <label className="font-weight-bold">* DESCRIPCIÓN: </label>
                            <Input
                                    id="descripcion"
                                    
                                    type="text"
                                /> 
                            </FormGroup>
                        </div>
                    </div>
                    <br/>
                    <div class="row justify-content-center">
                        <div class="col-4 justify-content-center" >
                        <Link to={`/admin/ViewSpecificDonor/${localStorage.getItem("idD")}`}>
                                <Button className="btn-fill" color="primary" >
                                    Regresar
                                </Button>
                        </Link>
                        </div>
                        <div class="col-4 justify-content-center" >
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
                <div>
                                <Input type="text" id="tipo" style={{display: "none"}}>

                                </Input>
                            </div>
                            <div>
                                <Input type="text" id="tipoid" style={{display: "none"}}>

                                </Input>
                            </div>
            </div>
        </div>
    </div>
  );
};

function ax(idC) {
  axios.get(API_BASE_URL+"donaciones/" + idC).then(function (resp) {
    console.log(resp.data);
           document.getElementById("tipo").value = resp.data[0].nombre;
           localStorage.setItem("donacion",resp.data[0].nombre);

           document.getElementById("tipoid").value = resp.data[0].idTipoDonacion;
           localStorage.setItem("tipoid",resp.data[0].idTipoDonacion);

           document.getElementById("fecha").value = resp.data[0].fechaDonacion;
           document.getElementById("descripcion").value = resp.data[0].descripcion;
           document.getElementById("monto").value = resp.data[0].monto;
           document.getElementById("valorId").value = idC;
  });
}


function modificar() {
    var tipo=document.getElementById("tipoid").value;
    var fecha=document.getElementById("fecha").value ;
    var descripcion=document.getElementById("descripcion").value ;
    var monto=document.getElementById("monto").value ;
    var idD=document.getElementById("valorId").value;
  if (fecha != ""&&descripcion != ""&&monto!= "") {
    const donacion = {
        fechaDonacion: fecha,
        descripcion: descripcion,
        monto: monto,
        idTipoDonacion:tipo,

      };
    axios
      .put(API_BASE_URL+"donaciones/" + idD, donacion)
      .then(function (resp) {
        console.log(resp.data);
      });

    Swal.fire("¡Listo!", "Cambios guardados", "success").then(function () {
      //this.props.history.push("/admin/ViewSpecificDonor/"+localStorage.getItem("idD"));
      window.location=FRONT_BASE_URL+"admin/ViewSpecificDonor/"+localStorage.getItem("idD");
    });
  } else {
    Swal.fire(
      "¡Error!",
      "Alguno de los campos se encuentra vacio",
      "error"
    );
  }
}

export default ModifyDonation;
