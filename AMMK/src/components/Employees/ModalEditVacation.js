/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, CustomInput, Label, Form } from 'reactstrap';
import SimpleTooltip from "../../views/General/SimpleTooltip";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function editVacation (idEmployee, idVacation) {
  let fechaSalida = document.getElementById("fechaSalida").value;
  let fechaRegreso = document.getElementById("fechaRegreso").value;
  console.log('employee: ', idEmployee);
  console.log('vacation: ', idVacation);

  if (fechaSalida !== '' && fechaRegreso !== '') {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  const registrarVacacion = {
    employees_id : idEmployee,
    fechaRegistro : date,
    fechaSalida: fechaSalida,
    fechaRegreso: fechaRegreso
  }
  const link = "http://localhost:3000/admin/view-employee/"+idEmployee
  axios.put('http://localhost:8000/api/employeeVacations/'+idVacation,registrarVacacion).then(res => {console.log(res)});

  Swal.fire(
    '¡Listo!',
    'Vacaciones modificadas de manera exitosa',
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



const ModalEditVacation = (props) => {
  const {
    buttonLabel,
    className,
    id,
    vacations
  } = props;


  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button id="registrarVacaciones" className="inline float-right" size="sm" inline onClick={toggle}><FontAwesomeIcon icon={['fas', 'pencil-alt']} /></Button>
      <SimpleTooltip placement="top" target="registrarVacaciones">Editar</SimpleTooltip>
      <Form>
      <Modal isOpen={modal} toggle={toggle} className={className} color="primary">
        <ModalHeader>
        <h3 className="title">Editar vacaciones</h3>
        </ModalHeader>
        <ModalBody>

              <FormGroup>
                <Label htmlFor="fechaSalida">
                  Fecha de salida
                </Label>
                <Input type="date" id="fechaSalida" defaultValue={vacations.fechaSalida}/>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="fechaRegreso">
                  Fecha de regreso
                </Label>
                <Input type="date" id="fechaRegreso" defaultValue={vacations.fechaRegreso}/>
              </FormGroup>


        </ModalBody>

        <ModalFooter>
          <Button color="info" visibility="none" onClick={toggle}>Cancelar</Button>{' '}
          <Button  onClick={editVacation.bind("this", id, vacations.id)}>Modificar</Button>
        </ModalFooter>
      </Modal>
      </Form>
    </div>
  );
}

export default ModalEditVacation;
