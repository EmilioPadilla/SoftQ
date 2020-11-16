/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, CustomInput, Label, Form } from 'reactstrap';
import SimpleTooltip from "../../views/General/SimpleTooltip";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function newVacation (id) {
  let fechaSalida = document.getElementById("fechaSalida").value;
  let fechaRegreso = document.getElementById("fechaRegreso").value;

  if (fechaSalida !== '' && fechaRegreso !== '') {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  const registrarVacacion = {
    employees_id : id,
    fechaRegistro : date,
    fechaSalida: fechaSalida,
    fechaRegreso: fechaRegreso
  }
  const link = "http://localhost:3000/admin/view-employee/"+id
  axios.post('http://localhost:8000/api/employeeVacations/',registrarVacacion).then(res => {console.log(res)});

  Swal.fire(
    '¡Listo!',
    'Vacaciones registradas de manera exitosa',
    'success'
    ).then(function() {
        window.location = link;
    });
  } else {
    Swal.fire( {
      icon: 'error',
      title: 'Oops...',
      text: 'No se han llenado todos los campos obligatorios!',
    })
  }
}


const ModalNewVacation = (props) => {
  const {
    buttonLabel,
    className,
    id,
    employee
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button id="registrarVacaciones" className="inline float-right" size="sm" inline onClick={toggle}><FontAwesomeIcon icon={['fas', 'plus-square']} /></Button>
      <SimpleTooltip placement="top" target="registrarVacaciones">Registrar Vacaciones</SimpleTooltip>
      <Form>
      <Modal isOpen={modal} toggle={toggle} className={className} color="primary">
        <ModalHeader toggle={toggle}>Agregar vacaciones</ModalHeader>
        {/* <h3 color="primary">Egresar empleado</h3> */}
        <ModalBody>

              <FormGroup>
                <Label htmlFor="fechaSalida">
                  Fecha de salida
                </Label>
                <Input type="date" id="fechaSalida" />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="fechaRegreso">
                  Fecha de regreso
                </Label>
                <Input type="date" id="fechaRegreso" />
              </FormGroup>


        </ModalBody>

        <ModalFooter>
          <Button color="info" visibility="none" onClick={toggle}>Salir</Button>{' '}
          <Button  onClick={newVacation.bind("this", id)}>Agregar</Button>
        </ModalFooter>
      </Modal>
      </Form>
    </div>
  );
}

export default ModalNewVacation;
