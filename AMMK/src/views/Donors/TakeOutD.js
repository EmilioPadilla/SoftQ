import React, { Component } from "react";
import { FormGroup, Form, Input, Button } from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { Progress, Alert,  Card, CardBody, CardHeader } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Link } from "react-router-dom";

const TakeOutD = (props) => {
    const login = localStorage.getItem("isLoggedIn");
    const idRol = localStorage.getItem("idRol");
    //Redirect in case of wrong role or no login
    /*if (!login ) {
        window.location = "http://localhost:3000/login";
    }else if(idRol==2){
        window.location = "http://localhost:3000/general/NurseIndex";
    }else if (idRol==1){
        window.location = "http://localhost:3000/admin/Nomina/Nomina";
    }*/
  const { id } = props.match.params;
  ax(id);
  return (
    <div class="content">
    <div class="container">

        <div class="row">
            <div class="col-12" >
            <h2 >Egresar Donante</h2>

                <Card>
          <CardHeader>
          <h3 align="center" className="title">Proceso de Egreso</h3>
          </CardHeader>
          <CardBody>
                <Form>
                    <div class="row justify-content-center">
                        <div class="col-4" >
                            <FormGroup>
                            <label className="font-weight-bold">*&nbsp;<FontAwesomeIcon icon={['fas', 'calendar-alt']} />&nbsp;FECHA DE EGRESO: </label>
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
                            <label className="font-weight-bold">* MOTIVO DE EGRESO: </label>
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
                                    Regresar
                                </Button>
                        </Link>
                        </div>
                        <div class="col-4" align="center">
                                <Button className="btn-fill" color="danger" onClick={modificar}>
                                    EGRESAR
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
  axios.get("http://localhost:8000/api/donantes/" + idC).then(function (resp) {
    console.log(resp.data);
           document.getElementById("motivo").value = resp.data[0].motivoEgreso;
           document.getElementById("fecha").value = resp.data[0].fechaEgreso;
           document.getElementById("valorId").value = idC;
  });
}


function modificar() {
            var motivo=document.getElementById("motivo").value ;
            var fecha=  document.getElementById("fecha").value ;
    var idD=document.getElementById("valorId").value;
  if (motivo!= "" && fecha != "") {
    const donante = {
        motivoEgreso: motivo,
        fechaEgreso: fecha,
        status_id:2

      };
    axios
      .put("http://localhost:8000/api/donantes/modificarEgreso/" + idD, donante)
      .then(function (resp) {
        console.log(resp.data);
      });

    Swal.fire("¡Listo!", "Donante Egresado de manera exitosa", "success").then(function () {
      window.location = "http://localhost:3000/admin/ViewDonors";
    });
  } else {
    Swal.fire(
      "¡Error!",
      "Alguno de los campos se encuentra vacio",
      "error"
    );
  }
}

export default TakeOutD;
