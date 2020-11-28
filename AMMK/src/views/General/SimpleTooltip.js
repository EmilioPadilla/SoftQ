import React, { Component } from 'react';
import { Tooltip } from 'reactstrap';
import { FRONT_BASE_URL } from 'index';

class SimpleTooltip extends Component {
  state = {isOpen: false};

  toggle = () => {
    this.setState({isOpen: !this.state.isOpen});
  };

  render () {
    
    const login = localStorage.getItem("isLoggedIn");
    const idRol = localStorage.getItem("idRol");
    //Redirect in case of wrong role or no login
    if (!login ) {
        window.location = FRONT_BASE_URL + "login";
    }else if(idRol==2){
        window.location = FRONT_BASE_URL + "general/NurseIndex";
    }else if (idRol==1){
        window.location = FRONT_BASE_URL + "admin/Nomina/Nomina";
    }


    return <Tooltip isOpen={this.state.isOpen} toggle={this.toggle} {...this.props} />;
  }
}

export default SimpleTooltip;