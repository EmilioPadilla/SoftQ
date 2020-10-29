/*!

@Author: Emilio Padilla Miranda
@Date: Monday, October 12, 2020

*/

import React from "react";

import AccountSearchIcon from 'mdi-react/AccountSearchIcon';
import DeleteIcon from 'mdi-react/DeleteIcon';
import ModalExitEmployee from "components/Employees/ModalExitEmployee.js";
import SimpleTooltip from "../../views/General/SimpleTooltip";

//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';


// reactstrap components
import {
  Card,
  CardTitle,
  CardHeader,
  CardBody,
  CardFooter,
  Table,
  Row,
  Button,
  Col
  } from "reactstrap";

  import axios from 'axios';

 


  class TableEmpAccounts extends React.Component {
    
    constructor(props) {
        super(props)
    
        // Setting up functions
        this.onChangeExpenseName = this.onChangeExpenseName.bind(this);
        // Setting up state
        this.state = {
          id: '',
        }
      }
    
      onChangeExpenseName(e) {
        this.setState({id: e.target.value});
        console.log(this.state.id);
        console.log("Hola");
      }
    
      crearTabla(){
        var tabla='<thead> <tr> <th> Nombre </th> <th> Username </th> <th> Rol </th> <th> Acciones </th> </tr> </thead> <tbody>';
        const num=1;
        axios.get("http://localhost:8000/api/employee/")
          .then(function (resp){
            console.log(resp.data);
            resp.data.forEach(element => {
              tabla = tabla.concat('<tr> <td>'+ element.nombreCompleto + '</td>');
              tabla = tabla.concat('<td>'+ element.CURP + '</td>');
              tabla = tabla.concat('<td>'+ element.correo + '</td>');
              tabla = tabla.concat('<td> <div class="row"> <div class="col"> <a href="/admin/view-employee"> <button id="verDetalle" type="button" class="btn btn-info btn-sm" > <i class="fa fa-eye"> </i></button> ');
              tabla = tabla.concat('</a> </div> <div class="col">  <button id="verDetalle" type="button" value="'+element.id+'" class="btn btn-danger btn-sm" onclick={this.cambiarId}> <i class="fa fa-trash-alt"> </i></button> </td> </tr> </div> </div>');
            });
            tabla = tabla.concat('</tbody>');
            document.getElementById("tablaCE").innerHTML = tabla;
          } );
      }

    



    render() {
        this.crearTabla();
        return (
          <Row>
            <Col md="12">
              <Table hover id="tablaCE">
              </Table>
            </Col>
          </Row>
          
        );
      }

  }

  export default TableEmpAccounts;
