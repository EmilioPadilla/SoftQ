import React, { Component } from "react";
import { Input} from "reactstrap"
import { API_BASE_URL, FRONT_BASE_URL } from 'index';

import axios from "axios";
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
    axios.get(API_BASE_URL+"donantes/"+idD)
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


