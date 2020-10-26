import React, { Component } from "react";
import { Row, Modal, Form, FormGroup,  Dropdown,Button, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SimpleTooltip from "../General/SimpleTooltip";
import axios from "axios";

class ModalRegistrarDonacion extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
    };
  }

  handleModal() {
    this.setState({ show: !this.state.show });
  }

  /***TIPO DE DONACION */
  //-> Dropdowm
  /*crearSelectTipoDonacion(){
    var sel='<option value="NA" disabled selected>Selecciona una opcion</option>';
    const num=1;
    axios.get("http://localhost:8000/api/tipodonacion").then(function(resp){
      
    console.log(resp.data);
    resp.data.forEach(element =>{
      sel = sel.concat('<option value="'+ element.id + ' " > '+ element.nombre+'</option>');
      //console.log(element.nombre);
    });
    document.getElementById("tipoDonacion").innerHTML=sel; 
  });
  }
  //**END TIPO DONACION */


  render() {

    //this.crearSelectTipoDonacion();


    return (

      <React.StrictMode>
        <Col>
     <Button  size="sm" id="registrarDonacion" className="btn btn-primary float-right" onClick={() => {
            this.handleModal();
          }}><FontAwesomeIcon icon={['fas', 'plus']} /></Button>
      <SimpleTooltip placement="top" target="registrarDonacion" >Registrar Donación</SimpleTooltip>

</Col>

      {/* <React.StrictMode> */}
        
        <Modal show={this.state.show} onHide={() => this.handleModal()} top>
          <Modal.Header closeButton>
            <Modal.Title>Registrar Donación:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div class="container">
            <Form>
              <Form.Row>
                <Form.Group as={Row} controlId="birthdayPatronato">
                  <Form.Label>Fecha en que se realizó:</Form.Label>
                  <Form.Control type="date" placeholder=" / / " />
                </Form.Group>
              </Form.Row>

              <FormGroup>
         <label>*Seleccione Tipo de Donación</label>
         <Form.Control as="select" id="tipoDonacion" ></Form.Control>
       </FormGroup>

              {/*Donacion Monetaria*/}
              
               
              
              <Form.Row>
                <Form.Group as={Row} controlId="Monto">
                  <Form.Label>Monto:</Form.Label>
                  <Form.Control type="date" placeholder="$3,000.00" />
                </Form.Group>
              </Form.Row>

                            {/*Donacion en especie*/}

            <Form.Row>
              <Form.Group as={Row} controlId="razonSocial">
                <Form.Label>Descripción:</Form.Label>
                <Form.Control type="text" placeholder="15 paquetes de arroz, 3 latas de atún y 5kg de frijols" />
              </Form.Group>
              </Form.Row>


              <Col align="center">

              <Button
                className="btn btn-outline-primary"
                onClick={() => {
                  this.handleClick();
                }}
              >
                Registrar
              </Button>

          </Col>

          </Form>
            </div>
          </Modal.Body>

          <Modal.Footer></Modal.Footer>
        </Modal>
      </React.StrictMode>
    );
  }
}

export default ModalRegistrarDonacion;
