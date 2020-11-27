import React, { Component } from "react";
import { Input} from "reactstrap"
import { Link } from "react-router-dom";

import { Row, Modal, Form, FormGroup,  Dropdown,Button, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SimpleTooltip from "../General/SimpleTooltip";
import axios from "axios";
import Swal from 'sweetalert2';

//form de registerDonation
class RegistroDonacion extends Component {
   
  //const {id}= props.match.params;  
  constructor(props){
        super(props)
      this.onSubmit= this.onSubmit.bind(this);
    }
   
    crearSelectTipoDonacion(){
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

     

    onSubmit(e){

        e.preventDefault()
      //agarrrar los valores con el id del forms
        var fecha = document.getElementById("fechaDonacion").value;
        var  monto= document.getElementById("monto").value;
        var descripcion = document.getElementById("descripcion").value;
        var tipoDonacion = document.getElementById("tipoDonacion").value;

      
      //nombre + F de facturacion
        const donacion = {
          fechaDonacion: fecha,
          descripcion: descripcion,
          monto: monto,
          idTipoDonacion:tipoDonacion

        };
        
        
        localStorage.setItem("prueba", JSON.stringify(donacion));
        var jsonArray0 = JSON.parse(localStorage.getItem("donante"));
        var jsonArray1 = JSON.parse(localStorage.getItem("prueba"));
        const jsonArray= {...jsonArray0,...jsonArray1};
        console.log(jsonArray0);
        localStorage.clear();

       // var jsonArray3=  JSON.parse(localStorage.getItem("prueba"));

      

        axios.post('http://localhost:8000/api/donaciones', jsonArray).then(res => {console.log(res)});
        
       //validacion
      
       Swal.fire(
        '¡Listo!',
        'Datos guardados',
        'success'
        ).then(function() {
            window.location = "http://localhost:3000/admin/ViewDonors";
        });
        
      
      
    }
      
    render() { 
        this.crearSelectTipoDonacion();

        return ( 
<div className="content">
        <div class="container-fluid">
          <h1 className="title">Registrar Donación</h1>
            <div class="container">
            <Form >
              <Form.Row>
                <Form.Group as={Row} controlId="fechaDonacion">
                  <Form.Label>Fecha en que se realizó:</Form.Label>
                  <Form.Control type="date" id="fechaDonacion" placeholder=" / / " />
                </Form.Group>
              
                </Form.Row>
                <Form.Row>
              <FormGroup as={Row}>
         <label>*Seleccione Tipo de Donación</label>
         <Form.Control as="select" id="tipoDonacion" ></Form.Control>
       </FormGroup>

       </Form.Row>
               
              
              <Form.Row>
                <Form.Group as={Row} controlId="monto">
                  <Form.Label>Monto:</Form.Label>
                  <Form.Control type="text" id="monto" placeholder="$3,000.00" />
                </Form.Group>
              </Form.Row>


            <Form.Row>
              <Form.Group as={Row} controlId="descripcion">
                <Form.Label>Descripción:</Form.Label>
                <Form.Control type="text" id="descripcion" placeholder="15 paquetes de arroz, 3 latas de atún y 5kg de frijols" />
              </Form.Group>
              </Form.Row>

              <Form.Row>
                <Link to='/admin/ViewDonors'>
              <Form.Group as={Col} controlId="descripcion">
              <Button type="submit" class="danger">Cancelar</Button>
              </Form.Group>
              </Link>
              <Form.Group as={Col} controlId="descripcion">
              <Button onSubmit={this.onSubmit} type="submit">Registrar</Button>
              </Form.Group>
              </Form.Row>

              

          </Form>
         
            </div>
            </div>
            </div>
          
         );
    }
}

 
export default RegistroDonacion;