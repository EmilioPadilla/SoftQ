/*!
@Author: Emilio Padilla Miranda
@Date: Sunday, October 11, 2020
*/
import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { API_BASE_URL, FRONT_BASE_URL } from 'index';
import { Prompt } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// reactstrap components
  import {
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Alert,
    Input,
    Row,
    Col,
    Progress,
    Label,
    CustomInput,
    Button,
  } from "reactstrap";


 function parseJobTitles(jobTitles){
  return jobTitles.map((jobTitles) => {
    return { label: jobTitles.nombre, value: jobTitles.id };
  });
}

 class ModifyEmployee3 extends React.Component {
   constructor(props){
     super(props)
     this.state = {
       markedDays: [],
       jobTitles: [],
       fechaIngreso: null,
       sede: null, 
       salario: null,
       puesto: null, 
       diasLaborales: null,
       monto: null,
       selectedOption: null
     }

  }
   componentDidMount() {
     this.getJobTitles();
   }

   getJobTitles() {
    axios.get(API_BASE_URL+'employeeJobTitles')
    .then(res => this.setState({ jobTitles: parseJobTitles(res.data) }));
  }

   onSubmit(e, history){
    // e.preventDefault()
    //Agarrar los valores 
    let fechaIngreso = document.getElementById("fechaIngreso").value;
    let headquarter_id = document.getElementById("sede").value;
    let frecuenciaSalario = document.getElementById("frecuenciaSalario").value;
    let puesto = document.getElementById("puesto").value;
    let turnosQuincena = document.getElementById("diasLaborales").value;
    let salarioxhora = document.getElementById("monto").value;
    var idD= document.getElementById("valorId").value;

    if (fechaIngreso !== '' && headquarter_id !== '' && frecuenciaSalario !== '' && puesto !== '' && turnosQuincena !== '') {
    const datosEmpleado = {
      fechaIngreso: fechaIngreso,
      headquarter_id: headquarter_id, 
      frecuenciaSalario: frecuenciaSalario,
      puesto: puesto, 
      diasLaborales: turnosQuincena,
      salarioxhora: salarioxhora,
    };

    axios.put(API_BASE_URL+"employee/employee/" + idD, datosEmpleado)
      .then(function (resp) {
        console.log(resp.data);
      });
    Swal.fire(
      '¡Listo!',
      'Empleado modificado de manera exitosa',
      'success'
      ).then(function() {
        // this.props.history.push("/admin/view-employee/"+idD);
        history.goBack();
      });
    } else{
      Swal.fire( {
        icon: 'error',
        title: '¡Error!',
        text: 'Verifica que todos los campos obligatorios estén completos.',
      })
    }

}
fillData (id) {
    axios.get(API_BASE_URL + 'employee/' + id)
        .then(function (res) {
           document.getElementById("fechaIngreso").value = res.data[0].fechaIngreso;
           document.getElementById("sede").value = res.data[0].headquarter_id;
           document.getElementById("frecuenciaSalario").value = res.data[0].frecuenciaSalario;
           document.getElementById("puesto").value = res.data[0].puesto;
           document.getElementById("diasLaborales").value = res.data[0].diasLaborales;
           document.getElementById("monto").value = res.data[0].salarioxhora;
           document.getElementById("valorId").value = id;
          })
  }


   render() {
    let urlElements = window.location.href.split('/');
    const login = localStorage.getItem("isLoggedIn");
    const idRol = localStorage.getItem("idRol");
    //Redirect in case of wrong role or no login
        if (!login ) {
        this.props.history.push('/login');
    }else if(idRol==2){
      this.props.history.push('/general/NurseIndex');
    }else if (idRol==1){
      this.props.history.push('/admin/Nomina/Nomina');
    }
    const { id } = this.props.match.params;
    this.fillData(id);
     return (
        <>
        <div className="content">
        <Prompt
            when={true}
            message="Te encuentras en proceso de registro                                                ¿Estás seguro de querer salir?"
          />
        <h2 className="title">Modificar empleado</h2>

        <Form autocomplete="off">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <br/>
                  <h3 className="title">Datos de empleado</h3>
                </CardHeader>
                <Alert color="primary">Los campos marcados con un asterisco (*) son obligatorios.</Alert>
                <CardBody>
                  
                    <Row>
                    <Col className="pl-md-1" md="6">
                      <Col>
                        <FormGroup>
                          <Label htmlFor="fechaIngreso">
                            * Fecha de ingreso
                          </Label>
                          <Input type="date" id="fechaIngreso"/>
                        </FormGroup>
                      </Col>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <Row>
                        <Col>
                        <Col>
                          <FormGroup>
                          <Label htmlFor="sede">* Sede</Label>
                              <Input type="select" name="select" id="sede">
                              <option defaultValue="0">Selecciona una sede...</option>
                              <option value="1">Asoc. MMK</option>
                              <option value="2">Granja Betanía</option>
                              </Input>
                          </FormGroup>
                          </Col>
                          </Col>  
                           </Row>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <Col>
                        <FormGroup>
                        <Label htmlFor="puesto">* Puesto</Label>
                            <Input type="select" name="select" id="puesto">
                            <option defaultValue="0">Selecciona un puesto...</option>
                            {this.state.jobTitles.map((jobTitle) => <option key={jobTitle.value} value={jobTitle.value}>{jobTitle.label}</option>)}
                            </Input>
                        </FormGroup>
                      </Col>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <Col>
                         <FormGroup>
                          <Label htmlFor="frecuenciaSalario">* Frecuencia de salario</Label>
                              <Input type="select" name="select" id="frecuenciaSalario">
                              <option defaultValue="0">Selecciona una frecuencia de salario...</option>
                              <option value="Variable">Variable</option>
                              <option value="Fijo">Fijo</option>
                              </Input>
                          </FormGroup>
                          </Col>
                       </Col>
                    </Row>
                    <Row>
                      <Col  md="6">
                        <Col className="pl-md-1">
                          <FormGroup>
                            <Label htmlFor="monto">Monto</Label>
                            <Input
                              placeholder="1500"
                              type="text"
                              id="monto"
                            />
                          </FormGroup>
                        </Col>
                      </Col>
                        <Col>
                          <FormGroup>
                            <Label htmlFor="diasLaborales">* Dias Laborales</Label>
                            <Input
                              placeholder="" type="number" id="diasLaborales"
                            />
                           </FormGroup>
                         </Col>
                     </Row>
                    
                </CardBody>
              </Card>
              <Row>
                <Col  md="12" align="center">
                 <Button className="btn btn-primary" onClick={this.onSubmit.bind("this", this.e, this.props.history)}>Modificar</Button>

                </Col>
              </Row>
            </Col>
          </Row>
          </Form>
          <div>
                    <Input type="text" id="valorId" style={{display: "none"}}>

                    </Input>
                </div>
        </div>
        <div class="fixed-bottom" style={{ margin: '15px' }}>
                    <Link to={{
                        pathname: '../view-employee/' + urlElements[5],
                        state: urlElements[5]
                    }}>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                     <Button color="primary" id="regresar"><FontAwesomeIcon icon={['fas', 'arrow-circle-left']} />&nbsp;Regresar</Button>
                    </Link>
                </div>
      </>
    );
  }
}
export default ModifyEmployee3;