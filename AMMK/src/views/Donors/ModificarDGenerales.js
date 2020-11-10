import React, { Component } from "react";
import { FormGroup, Form, Input, Button } from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ModificarDGenerales = (props) => {
    const login = localStorage.getItem("isLoggedIn");
    const idRol = localStorage.getItem("idRol");
    //Redirect in case of wrong role or no login
    if (!login ) {
        window.location = "http://localhost:3000/login";
    }else if(idRol==2){
        window.location = "http://localhost:3000/general/NurseIndex";
    }else if (idRol==1){
        window.location = "http://localhost:3000/admin/Nomina/Nomina";
    }
  const { id } = props.match.params;
  ax(id);
  return (
    <div class="content">
    <div class="container">
        <div class="row">
            <div class="col-12" >
                <h2 align="center">Modificar Datos Generales del Donante</h2>

                <Form>
                <div class="row justify-content-center">
                        <div class="col-4" >
                            <FormGroup>
                            <p className="font-weight-bold">NOMBRE COMPLETO: </p>
                            <Input
                                    id="nombre"
                                    
                                    type="text"
                                />    
                     </FormGroup>
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-4" >
                            <FormGroup>
                            <p className="font-weight-bold">FECHA DE CUMPLEAÑOS: </p>
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
                            <p className="font-weight-bold">RFC: </p>
                            <Input
                                    id="rfc"
                                    
                                    type="text"
                                /> 
                            </FormGroup>
                           
                        </div>
                    </div>
                    <div class="row justify-content-center">
                    
                        <div class="col-4">
                            <FormGroup >
                            <p  className="font-weight-bold">TELEFONO: </p>
                            <Input
                                    id="tel"
                                    
                                    type="text"
                                /> 
                            </FormGroup>
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-4">
                            <FormGroup>
                            <p className="font-weight-bold">CELULAR: </p>
                            <Input
                                    id="celular"
                                    
                                    type="text"
                                /> 
                            </FormGroup>
                        </div>
                    </div>
                    <br/>
                    <div class="row justify-content-center">
                        <div class="col-4">
                            <FormGroup>
                            <p className="font-weight-bold">CORREO: </p>
                            <Input
                                    id="correo"
                                    
                                    type="email"
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
            </div>
        </div>
    </div>
</div>
  );
};

function ax(idC) {
  axios.get("http://localhost:8000/api/donantes/" + idC).then(function (resp) {
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
  if (nom!= "" && fecha != ""&&rfc != ""&&tel != ""&&cel!= ""&&correo!= "") {
    const donante = {
        nombreCompleto1: nom,
        fechaCumpleaños1: fecha,
        RFC1: rfc,
        correo1: correo,
        telefono1: tel,
        celular1: cel,

      };
    axios
      .put("http://localhost:8000/api/donantes/" + idD, donante)
      .then(function (resp) {
        console.log(resp.data);
      });

    Swal.fire("¡Listo!", "Cambios guardados", "success").then(function () {
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

export default ModificarDGenerales;
