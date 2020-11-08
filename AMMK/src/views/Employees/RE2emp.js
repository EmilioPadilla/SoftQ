/*!

@Author: Emilio Padilla Miranda
@Date: Sunday, October 11, 2020

*/

import React from "react";
import { Link } from "react-router-dom";




// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Progress,
  Label,
  CustomInput,
  Alert,
  Button
} from "reactstrap";


class RegisterEmployee2 extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      estado: null,
      ciudad: null, 
      calle: null,
      numExt: null, 
      numInt: null, 
      cp: null, 
      colonia: null,
      municipio: null,
      correo: null, 
      telefono: null,
      celular: null
    }
  }

  onSubmit(e){
    e.preventDefault()
    //Agarrar los valores 
    let estado = document.getElementById("estadoSelect").value;
    let ciudad = document.getElementById("ciudadSelect").value;
    let calle = document.getElementById("calle").value;
    let numExterior = document.getElementById("numExt").value;
    let numInterior = document.getElementById("numInt").value;
    let codigoPostal = document.getElementById("cp").value;
    let colonia = document.getElementById("colonia").value;
    let municipio = document.getElementById("municipio").value;
    let correo = document.getElementById("correo").value;
    let telefono = document.getElementById("telefono").value;
    let celular = document.getElementById("celular").value;

    const datosContacto = {
      estado: estado,
      ciudad: ciudad, 
      calle: calle,
      numExterior: numExterior, 
      numInterior: numInterior, 
      codigoPostal: codigoPostal, 
      colonia: colonia,
      municipio: municipio,
      correo: correo, 
      telefono: telefono,
      celular: celular
    };
    localStorage.setItem("contacto", JSON.stringify(datosContacto));
    // console.log(localStorage.getItem("contacto"));
}


  render() {
    return (
      <>
        <div className="content">
          <h2 className="title">Registrar empleado</h2>
          <Form onClick={this.onSubmit}>
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                 
                <h3 className="title">Datos de contacto</h3>
                    <Progress value="66.66" striped color="primary"/>
                    <br></br>
                        <Alert color="primary">Los campos marcados con un asterisco (*) son obligatorios.</Alert>
                  
                </CardHeader>
                <CardBody>
                  
                    <Row>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <Label htmlFor="estadoSelect">* Estado</Label>
                          <Input type="select" name="select" id="estadoSelect">
                          <option defaultValue="1">Selecciona un estado...</option>
                          <option >Guanajuato</option>
                          <option>Puebla</option>
                          <option >Queretaro</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <Label htmlFor="ciudadSelect">* Ciudad</Label>
                          <Input type="select" name="select" id="ciudadSelect">
                          <option defaultValue="1">Selecciona una ciudad...</option>
                          <option >Guanajuato</option>
                          <option>Irapuato</option>
                          <option >Salamanca</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <Label htmlFor="calle">Calle</Label>
                          <Input
                            defaultValue=""
                            placeholder=""
                            type="text"
                            id="calle"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="2">
                        <FormGroup>
                          <Label htmlFor="numExt">#Ext</Label>
                          <Input
                            placeholder=""
                            type="text"
                            id="numExt"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="2">
                        <FormGroup>
                          <Label htmlFor="numInt">
                            #Int
                          </Label>
                          <Input
                            placeholder=""
                            type="text"
                            id="numInt"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="2">
                        <FormGroup>
                          <Label htmlFor="cp">
                            C.P
                          </Label>
                          <Input
                            placeholder=""
                            type="text"
                            id="cp"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <Label htmlFor="colonia">Colonia</Label>
                          <Input
                            placeholder="Company"
                            type="text"
                            id="colonia"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <Label htmlFor="municipio">* Municipio</Label>
                          <Input
                            placeholder="Corregidora"
                            type="text"
                            id="municipio"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pl-md-1" md="7">
                        <FormGroup>
                        <Label htmlFor="CompDom">Comprobante de Domicilio</Label>
                        <CustomInput type="file" name="customFile" id="CompDom" label="Selecciona un archivo"/>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pl-md-1" md="7">
                        <FormGroup>
                          <Label htmlFor="correo">Correo</Label>
                          <Input
                            placeholder="mike@email.com" type="email"id="correo"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <Label htmlFor="telefono">Teléfono</Label>
                          <Input
                            placeholder="" type="tel" id="telefono"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <Label htmlFor="celular">* Celular</Label>
                          <Input
                            placeholder="" type="tel" id="celular"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  
                </CardBody>
              </Card>
              <Row>
              <Col  md="6">
              <Link to='/admin/register-employee'>
                <button className="btn btn-primary" >Regresar</button>
              </Link>
              </Col>
              <Col md="6" align="right">
              <Link to='/admin/RE3'>
                <Button className="btn btn-primary" onClick="onSubmit()">Siguiente</Button>
                {this.props.children}
              </Link>
              </Col>
              </Row>
            </Col>
          </Row>
          </Form>

        </div>
      </>
    );
  }
}

export default RegisterEmployee2;
