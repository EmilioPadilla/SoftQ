import React, { Component } from "react";
import { FormGroup, Form, Input, Button } from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ModifyDonation = (props) => {
  const { id } = props.match.params;
  ax(id);
  return (
    <div class="content">
    <div class="container">
        <div class="row">
            <div class="col-12" >
                <h2 align="center">Modificar Donación</h2>

                <Form>
                    <div class="row justify-content-center">
                        <div class="col-4" >
                            <FormGroup>
                            <p className="font-weight-bold">FECHA EN QUE SE REALIZÓ: </p>
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
                            <p className="font-weight-bold">TIPO DONACIÓN: </p>
                            <Input
                                    id="tipo"
                                    
                                    type="text"
                                /> 
                            </FormGroup>
                           
                        </div>
                    </div>
                    <div class="row justify-content-center">
                    
                        <div class="col-4">
                            <FormGroup >
                            <p className="font-weight-bold">MONTO: </p>
                            <Input
                                    id="monto"
                                    
                                    type="text"
                                /> 
                            </FormGroup>
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-4">
                            <FormGroup>
                            <p className="font-weight-bold">DESCRIPCIÓN: </p>
                            <Input
                                    id="descripcion"
                                    
                                    type="text"
                                /> 
                            </FormGroup>
                        </div>
                    </div>
                    <br/>
                    <div class="row justify-content-center">
                        <div class="col-4" align="center">
                        <Link to="/admin/ViewDonors">
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
  axios.get("http://localhost:8000/api/donaciones/" + idC).then(function (resp) {
    console.log(resp.data);
           document.getElementById("tipo").value = resp.data[0].idTipoDonacion;
           document.getElementById("fecha").value = resp.data[0].fechaDonacion;
           document.getElementById("descripcion").value = resp.data[0].descripcion;
           document.getElementById("monto").value = resp.data[0].monto;
           document.getElementById("valorId").value = idC;
  });
}


function modificar() {
    var tipo=document.getElementById("tipo").value;
    var fecha=document.getElementById("fecha").value ;
    var descripcion=document.getElementById("descripcion").value ;
    var monto=document.getElementById("monto").value ;
    var idD=document.getElementById("valorId").value;
  if (tipo!= "" &&fecha != ""&&descripcion != ""&&monto!= "") {
    const donacion = {
        fechaDonacion: fecha,
        descripcion: descripcion,
        monto: monto,
        idTipoDonacion:tipo,

      };
    axios
      .put("http://localhost:8000/api/donaciones/" + idD, donacion)
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

export default ModifyDonation;
