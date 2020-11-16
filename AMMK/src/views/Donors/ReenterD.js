import React, { Component } from "react";
import { FormGroup, Form, Input, Button } from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
const ReenterD = (props) => {
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

                <h2 align="center">Re-Ingresar Donante</h2>
                <Form>
                    <div class="row justify-content-center">
                        <div class="col-4" >
                            <FormGroup>
                            <p className="font-weight-bold">FECHA DE RE-INGRESO: </p>
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
                            <p className="font-weight-bold">MOTIVO DE RE-INGRESO: </p>
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
            </div>
        </div>
    </div>
</div>
  );
};

function ax(idC) {
  axios.get("http://localhost:8000/api/donantes/" + idC).then(function (resp) {
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
      .put("http://localhost:8000/api/donantes/" + idD, donante)
      .then(function (resp) {
        console.log(resp.data);
      });

    Swal.fire("¡Listo!", "Donante Re-Ingresado de manera exitosa", "success").then(function () {
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

export default ReenterD;
