import React, { Component } from "react";
import { FormGroup, Form, Input, Button } from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { Progress, Alert,  Card, CardBody, CardHeader } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { API_BASE_URL, FRONT_BASE_URL } from 'index';

import { Link } from "react-router-dom";
const ReenterD = (props) => {
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
  const { id } = props.match.params;
  ax(id);
  return (
    <div class="content">
    <div class="container">
        <div class="row">
            <div class="col-12" >

            <h2 >Re-Ingresar Donante</h2>

<Card>
<CardHeader>
<h3 align="center" className="title">Proceso de Re-Ingreso</h3>
</CardHeader>
<CardBody>
                <Form>
                    <div class="row justify-content-center">
                        <div class="col-4" >
                            <FormGroup>
                            <label className="font-weight-bold">*&nbsp;<FontAwesomeIcon icon={['fas', 'calendar-alt']} />&nbsp;FECHA DE RE-INGRESO: </label>
                            <Input
                                    id="fecha"
                                    
                                    type="date"
                                />    
                     </FormGroup>
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-4">
                            <FormGroup>
                            <label className="font-weight-bold">* MOTIVO DE RE-INGRESO: </label>
                            <Input
                                    id="motivo"
                                    
                                    type="text"
                                /> 
                            </FormGroup>
                           
                        </div>
                    </div>
                    
                    <br/>
                    <div class="row justify-content-center">
                        <div class="col-4" align="center">
                        <Link to={`/admin/ViewDonors`}>

                                <Button className="btn-fill" color="primary" >
                                    REGRESAR
                                </Button>
                        </Link>
                        </div>
                        <div class="col-4" align="center">
                                <Button className="btn-fill" color="success" onClick={modificar}>
                                    RE-INGRESAR
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
           document.getElementById("motivo").value = resp.data[0].motivoIngreso;
           document.getElementById("fecha").value = resp.data[0].fechaIngreso;
           document.getElementById("valorId").value = idC;
  });
}


function modificar() {
            var motivo=document.getElementById("motivo").value ;
            var fecha=  document.getElementById("fecha").value ;
    var idD=document.getElementById("valorId").value;
  if (motivo!= "" && fecha != "") {
    const donante = {
        motivoIngreso: motivo,
        fechaIngreso: fecha,
        status_id:1

      };
    axios
      .put(API_BASE_URL+"donantes/modificarReIngreso/" + idD, donante)
      .then(function (resp) {
        console.log(resp.data);
      });

    Swal.fire("¡Listo!", "Donante Egresado de manera exitosa", "success").then(function () {
      window.location = FRONT_BASE_URL+"admin/ViewDonors";
    });
  } else {
    Swal.fire(
      "¡Error!",
      "Alguno de los campos se encuentra vacio",
      "error"
    );
  }
}

export default ReenterD;
