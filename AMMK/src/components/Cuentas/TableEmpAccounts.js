/*!

@Author: Emilio Padilla Miranda
@Date: Monday, October 12, 2020

*/

import React from "react";

import { API_BASE_URL, FRONT_BASE_URL } from 'index';

// reactstrap components
import {
  Table,
  Row,
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
        var tabla='<thead> <tr> <th> Nombre </th> <th> Nombre de usuario </th> <th> Rol </th> <th> Acciones </th> </tr> </thead> <tbody>';
        const num=1;
        axios.get(API_BASE_URL+"employee/")
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
