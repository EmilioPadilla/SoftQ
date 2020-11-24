import React, { Component } from "react";
import { FormGroup, Form, Input, Button, Alert, Label } from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

//ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

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

                <h2 align="center" className="title">Egresar Donante</h2>
                <Form>
                <Alert color="primary">Todos los campos son obligatorios.</Alert>
                    <div class="row justify-content-center">
                        <div class="col-4" >
                            <FormGroup>
                            <Label><FontAwesomeIcon icon={['fas', 'calendar-alt']} />&nbsp;Fecha de egreso:</Label>
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
                            <Label>Motivo de egreso:</Label>
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
                                    Egresar
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
      .put("http://localhost:8000/api/donantes/" + idD, donante)
      .then(function (resp) {
        console.log(resp.data);
      });

    Swal.fire("¡Listo!", "Donante egresado de manera exitosa.", "success").then(function () {
      window.location = "http://localhost:3000/admin/ViewDonors";
    });
  } else {
    Swal.fire( {
      icon: 'error',
      title: '¡ERROR!',
      text: 'Verifica que todos los campos obligatorios estén completos.',
    })
  }
}

export default TakeOutD;
