import React, { Component } from "react";
import { Input} from "reactstrap"

import { Row, Modal, Form, FormGroup,  Dropdown,Button, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SimpleTooltip from "../General/SimpleTooltip";
import axios from "axios";
import Swal from 'sweetalert2';
import RegistroDonacion from './RegistroDonacion'

const RegisterDonation = props =>{

  const {id}= props.match.params;
  ax(id);
console.log(id);
  return(
<div className="content">
  <RegistroDonacion/>
<div>
<Input type="text" id="valorId" style={{display: "none"}}>

</Input>
</div>
  </div>
  )
  function ax(idD){
    axios.get("http://localhost:8000/api/donantes/"+idD)
    .then(function (resp){
      console.log(resp.data);
      document.getElementById("valorId").innerHTML = idD;
    } );
    const donante={
      idDonante:idD,
    }
    localStorage.setItem("donante", JSON.stringify(donante));
  }

 
}

export default RegisterDonation;


