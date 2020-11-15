
import React, { Component } from "react";
import { Input} from "reactstrap"
import axios from "axios";
import RegistroContactoDonante from './RegistroContactoDonante'


const RegisterDonation = props =>{
  
  const login = localStorage.getItem("isLoggedIn");
  const idRol = localStorage.getItem("idRol");
  //Redirect in case of wrong role or no login
 /* if (!login ) {
      window.location = "http://localhost:3000/login";
  }else if(idRol==2){
      window.location = "http://localhost:3000/general/NurseIndex";
  }else if (idRol==1){
      window.location = "http://localhost:3000/admin/Nomina/Nomina";
  }*/

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
  
  
  