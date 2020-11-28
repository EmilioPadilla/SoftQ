
import React, { Component } from "react";
import { Input} from "reactstrap"
import axios from "axios";
import RegistroContactoDonante from './RegistroContactoDonante'


const RegisterDonation = props =>{

    const {id}= props.match.params;
    ax(id);
  console.log(id);
    return(
  <div className="content">
    <RegistroContactoDonante/>
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
  
  
  